import qs from 'qs'

type Timeout = ReturnType<typeof setTimeout>
type Interval = ReturnType<typeof setInterval>
type Nullable<T> = T | null

const reconnectMaxCount = 3
const message = 'ping'
const interval = 3000
const timeout = 1000

/**
 * WebSocket 自动重连配置。
 */
export interface WSAutoReconnectOptions {
  /**
   * 最大重连次数，默认 `3`。
   */
  reconnectMaxCount?: number
}

/**
 * WebSocket 心跳配置。
 */
export interface WSHeartbeatOptions {
  /**
   * 心跳消息内容，默认 `ping`。
   */
  message: string
  /**
   * 心跳间隔，单位毫秒，默认 `3000`。
   */
  interval: number
}

/**
 * `WS` 构造函数可选配置。
 */
export interface WSOptions {
  /**
   * 是否自动重连。
   *
   * - `true`: 使用默认重连策略
   * - `false`: 不自动重连
   * - 对象: 自定义重连次数
   */
  autoReconnect: boolean | WSAutoReconnectOptions
  /**
   * 是否开启心跳。
   *
   * - `false`: 不发送心跳
   * - `true`: 使用默认心跳策略
   * - 对象: 自定义心跳内容和间隔
   */
  heartbeat: boolean | WSHeartbeatOptions
  /**
   * 需要拼接到 url 上的查询参数。
   */
  query: Record<string, string>
}

/**
 * WebSocket 轻量封装，支持自动连接、自动重连、心跳和 query 参数。
 *
 * @example
 * const ws = new WS('wss://example.com/ws', {
 *   autoReconnect: true,
 *   heartbeat: { message: 'ping', interval: 3000 },
 *   query: { token: 'demo-token' },
 * })
 *
 * ws.onMessage((message) => {
 *   console.log(message)
 * })
 *
 * ws.send('hello')
 */
export class WS {
  url: string
  socket: WebSocket | null = null
  reconnectCount = 0
  delay: Nullable<Timeout> = null
  timer: Nullable<Interval> = null
  autoReconnect: WSOptions['autoReconnect']
  heartbeat: WSOptions['heartbeat']
  query: WSOptions['query']

  /**
   * 创建并立即连接一个 WebSocket 实例。
   *
   * @param url WebSocket 地址，例如 `wss://example.com/ws`。
   * @param options 连接配置，支持重连、心跳和 query 参数。
   *
   * @example
   * const ws = new WS('wss://example.com/ws', {
   *   autoReconnect: { reconnectMaxCount: 5 },
   *   heartbeat: { message: 'ping', interval: 5000 },
   *   query: { token: 'abc123' },
   * })
   */
  constructor(url?: string, options?: WSOptions) {
    const { autoReconnect = true, query = {}, heartbeat = false } = options || {}
    this.autoReconnect = autoReconnect
    this.heartbeat = heartbeat
    this.query = query

    this.url = `${url}` + qs.stringify({ ...this.query }, { addQueryPrefix: true })

    this.connect()
  }

  /**
   * 主动发起连接。
   *
   * 调用时会先关闭旧连接，再创建新的 WebSocket 实例。
   *
   * @example
   * const ws = new WS('wss://example.com/ws')
   * ws.connect()
   */
  connect(): void {
    this.close()
    this.socket = new WebSocket(this.url)
    this.onError()
    this.onOpen()
  }

  /**
   * 注册连接成功后的处理逻辑，并在需要时开启心跳。
   *
   * @example
   * const ws = new WS('wss://example.com/ws')
   * ws.onOpen()
   */
  onOpen(): void {
    if (this.socket) {
      this.socket.onopen = () => {
        this.send('ping')
        this.heartbeat && this.startHeartbeat()
      }
    }
  }

  /**
   * 开启心跳发送。
   *
   * @example
   * const ws = new WS('wss://example.com/ws', {
   *   heartbeat: { message: 'ping', interval: 3000 },
   * })
   * ws.startHeartbeat()
   */
  startHeartbeat(): void {
    const msg = (this.heartbeat as WSHeartbeatOptions)?.message || message
    const int = (this.heartbeat as WSHeartbeatOptions)?.interval || interval
    this.timer = setInterval(() => {
      this.send(msg)
    }, int)
  }

  /**
   * 注册错误处理和自动重连逻辑。
   *
   * @example
   * const ws = new WS('wss://example.com/ws', { autoReconnect: true })
   * ws.onError()
   */
  onError(): void {
    if (this.socket) {
      this.socket.onerror = () => {
        const count = (this.autoReconnect as WSAutoReconnectOptions)?.reconnectMaxCount || reconnectMaxCount
        if (this.autoReconnect && this.reconnectCount < count) {
          this.reconnectCount++
          this.connect()
        }
      }
    }
  }

  /**
   * 关闭连接并清理相关定时器。
   *
   * @example
   * ws.close()
   */
  close(): void {
    this.socket && this.socket.close()
    this.delay && clearTimeout(this.delay)
    this.timer && clearInterval(this.timer)
    this.socket = null
  }

  /**
   * 监听服务端消息。
   *
   * 内部会优先尝试将消息解析为 JSON；解析失败时会回传原始 `MessageEvent`。
   *
   * @param callback 接收到消息时触发的回调。
   *
   * @example
   * ws.onMessage((message) => {
   *   console.log(message)
   * })
   */
  onMessage(callback: (data: unknown) => any): void {
    if (this.socket) {
      this.socket.onmessage = (data) => {
        try {
          const res = JSON.parse(data.data)
          callback(res)
        } catch (err) {
          callback(data)
        }
      }
    }
  }

  /**
   * 发送消息。
   *
   * - 如果连接已就绪，会立即发送
   * - 如果正在连接，会延迟发送
   * - 如果连接已关闭，会先重新连接再发送
   *
   * @param data 需要发送的消息内容。
   *
   * @example
   * ws.send('hello')
   *
   * @example
   * ws.send(JSON.stringify({ type: 'ping' }))
   */
  send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    if (!this.socket) return
    if (this.socket.readyState === this.socket.OPEN) {
      this.socket.send(JSON.stringify(data))
    } else if (this.socket.readyState === this.socket.CONNECTING) {
      this.delay = setTimeout(() => {
        this.socket?.send(data)
      }, timeout)
    } else {
      this.connect()
      this.delay = setTimeout(() => {
        this.socket?.send(data)
      }, timeout)
    }
  }
}
