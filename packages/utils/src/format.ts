import { getType } from './base'
import { isNumber, isStringNumber } from './is'

/**
 * `formatBytes` 的配置项。
 */
export interface FormatBytesOptions {
  /**
   * 小数位数，默认 `2`。
   */
  digit?: number
  /**
   * 是否加千分位，默认 `false`。
   */
  thousands?: boolean
  /**
   * 文本前缀，例如 `$`。
   */
  prefix?: string
  /**
   * 文本后缀，例如 `/s`。
   */
  suffix?: string
  /**
   * 取整方式，默认 `floor`。
   */
  roundType?: 'floor' | 'ceil' | 'round'
}

/**
 * `formatBytesConvert` 的配置项。
 */
export interface FormatBytesConvertOptions {
  /**
   * 是否使用千分位输出。
   */
  thounsands?: boolean
  /**
   * 保留小数位数。
   */
  digit?: number
}

/**
 * `formatImg` 的配置项。
 */
export interface FormatImgOptions {
  /**
   * 静态资源根目录，默认 `assets/images`。
   */
  basePath?: string
}

/**
 * `formatToFixed` 的配置项。
 */
export interface FormatToFixedOptions {
  /**
   * 小数位数，默认 `2`。
   */
  digit?: number
  /**
   * 文本前缀，例如 `$`。
   */
  prefix?: string
  /**
   * 文本后缀，例如 `%`。
   */
  suffix?: string
  /**
   * 是否保留原单位，默认 `true`。
   */
  unit?: boolean
  /**
   * 是否添加千分位，默认 `false`。
   */
  thousands?: boolean
}

export type FormatTimeInput = Date | string | number
export type FormatTimeFallback = string | ((time: FormatTimeInput) => string)

/**
 * 将字节数格式化成更易读的单位字符串。
 *
 * @param bytes 字节数，支持数字和数字字符串。
 * @param options 配置项。
 * @returns 格式化后的字节字符串；如果输入不是合法数字，则原样返回。
 *
 * @example
 * formatBytes(1024)
 * // => '1.00 KB'
 *
 * @example
 * formatBytes(1040000, {
 *   digit: 3,
 *   prefix: '$',
 *   suffix: '/s',
 *   roundType: 'round',
 *   thousands: true,
 * })
 * // => '$1,015.625 KB/s'
 */
export function formatBytes(bytes: number | string, options: FormatBytesOptions = {}): string | number {
  let { digit = 2, thousands = false, prefix = '', suffix = '', roundType = 'floor' } = options
  if (isStringNumber(bytes as any) || isNumber(bytes)) {
    bytes = Number(bytes)
  } else {
    return bytes
  }

  if (bytes <= 1) {
    return Math[roundType](bytes * Math.pow(10, digit)) / Math.pow(10, digit) + ' B'
  }

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const power = Math.pow(k, i)

  let num = bytes / power
  num = Math[roundType](num * Math.pow(10, digit)) / Math.pow(10, digit)

  let res = num.toFixed(digit) + ' ' + sizes[i]
  if (thousands) {
    res = String(formatThousands(res))
  }

  return `${prefix}${res}${suffix}`
}

/**
 * 将带单位的字节字符串转换为原始字节数。
 *
 * @param oBytes 字节字符串，例如 `1.5GB`、`1,024 KB`，也支持纯数字。
 * @param options 配置项。
 * @returns 字节数；如启用了 `digit` 或 `thounsands`，返回格式化后的字符串。
 *
 * @example
 * formatBytesConvert('0.5GB')
 * // => 536870912
 *
 * @example
 * formatBytesConvert('1,234 GB', { thounsands: true })
 * // => '1,324,997,410,816'
 */
export function formatBytesConvert(
  oBytes: unknown,
  options: FormatBytesConvertOptions = {},
): string | number | undefined {
  let { thounsands = false, digit = 0 } = options
  let bytes = oBytes

  const parseDigitThounsands = (val: unknown) => {
    let finalRes = val as any
    if (digit) {
      finalRes = Number(finalRes).toFixed(digit)
    }
    if (thounsands) {
      finalRes = formatThousands(finalRes)
    }
    return finalRes
  }

  if (isStringNumber(oBytes as string) || isNumber(oBytes) || getType(oBytes) !== 'string') {
    return parseDigitThounsands(oBytes)
  }
  if (!oBytes) {
    return parseDigitThounsands(oBytes)
  }

  const regex = /^\d{1,3}(,\d{3})*(\.\d+)?[a-zA-Z ]*$/
  if (typeof oBytes === 'string' && regex.test(oBytes)) {
    bytes = oBytes.replace(/,/g, '')
    if (isStringNumber(bytes) || isNumber(bytes) || getType(bytes) !== 'string') {
      return parseDigitThounsands(bytes)
    }
  }

  const bytesRegex = /^(\d+(?:\.\d+)?)\s*([BKMGTPEZY]?B|Byte)$/i
  const units = {
    B: 1,
    BYTE: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
    TB: 1024 ** 4,
    PB: 1024 ** 5,
    EB: 1024 ** 6,
    ZB: 1024 ** 7,
    YB: 1024 ** 8,
  }

  if (typeof bytes !== 'string') {
    return parseDigitThounsands(bytes)
  }

  const match = bytes.match(bytesRegex)
  if (!match) {
    console.warn("Invalid bytes format. Please provide a valid bytes string, like '100GB'.")
    return
  }

  const size = parseFloat(match[1])
  const unit = match[2].toUpperCase() as keyof typeof units
  if (!Object.prototype.hasOwnProperty.call(units, unit)) {
    console.warn(
      "Invalid bytes unit. Please provide a valid unit, like 'B', 'BYTE', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', or 'YB'.",
    )
    return
  }

  return parseDigitThounsands(size * units[unit])
}

/**
 * 为数字或数字字符串添加千分位分隔符。
 *
 * @param value 需要格式化的值。
 * @returns 添加千分位后的字符串；如果不符合规则则原样返回。
 *
 * @example
 * formatThousands(1234567)
 * // => '1,234,567'
 *
 * @example
 * formatThousands('1234.12MB')
 * // => '1,234.12MB'
 */
export function formatThousands(value: string | number): string | number {
  const matches = ('' + value).match(/^([\d,]+)(\.?)(\d+)?(\D+)?$/)
  if (!matches) {
    return value
  }

  const numericString = matches[1].replace(/\D/g, '')
  const decimalString = matches[3] ? `.${matches[3]}` : ''
  const unit = matches[4] || ''
  const numberWithSeparator = numericString.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return `${numberWithSeparator}${decimalString}${unit}`
}

/**
 * 将时间值格式化为指定模板字符串。
 *
 * 支持 `Date`、毫秒时间戳、秒级时间戳、ISO 字符串和普通日期字符串。
 *
 * @param time 时间值，默认当前时间。
 * @param cFormat 格式模板，默认 `{y}-{m}-{d} {h}:{i}:{s}`。
 * @param fallback 非法日期时的兜底返回值，默认返回原始输入。
 * @returns 格式化后的时间字符串。
 *
 * @example
 * formatTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')
 *
 * @example
 * formatTime(1713926400, '{y}/{m}/{d}')
 * // => '2024/04/24'
 */
export function formatTime(
  time: FormatTimeInput = new Date(),
  cFormat = '{y}-{m}-{d} {h}:{i}:{s}',
  fallback: FormatTimeFallback = (value) => String(value),
): string {
  let date: Date
  const timeStr = String(time)

  if (typeof time === 'object' && time instanceof Date) {
    date = time
  } else {
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?$/

    if (isoRegex.test(timeStr)) {
      date = new Date(time)
    } else if (timeStr.includes('.') && !isNaN(parseFloat(timeStr))) {
      date = new Date(parseFloat(timeStr) * 1000)
    } else if (/^\d{10}$/.test(timeStr)) {
      date = new Date(parseInt(timeStr) * 1000)
    } else {
      date = new Date(time)
    }
  }

  if (isNaN(date.getTime())) {
    return typeof fallback === 'function' ? fallback(time) : fallback
  }

  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }

  return cFormat.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    const value = formatObj[key as keyof typeof formatObj]

    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }

    if (result.length > 0 && value < 10) {
      return '0' + value
    }

    return String(value)
  })
}

/**
 * 将持续时间时间戳格式化为“天 / 时 / 分 / 秒”文本。
 *
 * @param timestamp 持续时间，单位毫秒。
 * @param cFormat 输出模板，默认 `{d}天{h}时{i}分{s}秒`。
 * @returns 格式化后的持续时间文本。
 *
 * @example
 * formatDurationTime(1162821)
 * // => '19分24秒'
 *
 * @example
 * formatDurationTime(5 * 60 * 1000, '{i}分{s}秒')
 * // => '05分00秒'
 */
export function formatDurationTime(timestamp: number, cFormat = '{d}天{h}时{i}分{s}秒'): string {
  const secondsPerMinute = 60
  const minutesPerHour = 60
  const hoursPerDay = 24
  let totalSeconds = Math.floor(timestamp / 1000)
  let days = 0

  if (cFormat.indexOf('d') !== -1) {
    days = Math.floor(totalSeconds / (secondsPerMinute * minutesPerHour * hoursPerDay))
    totalSeconds %= secondsPerMinute * minutesPerHour * hoursPerDay
  }

  const hours = Math.floor(totalSeconds / (secondsPerMinute * minutesPerHour))
  totalSeconds %= secondsPerMinute * minutesPerHour
  const minutes = Math.floor(totalSeconds / secondsPerMinute)
  const seconds = totalSeconds % secondsPerMinute

  const formatObj = {
    d: days,
    h: hours,
    i: minutes,
    s: seconds,
  }

  let parseFormat = cFormat
  if (days === 0) {
    parseFormat = cFormat.match(/{h}.*/g)?.[0] ?? ''
    if (hours === 0) {
      parseFormat = cFormat.match(/{i}.*/g)?.[0] ?? ''
      if (minutes === 0) {
        parseFormat = cFormat.match(/{s}.*/g)?.[0] ?? ''
      }
    }
  }

  return parseFormat.replace(/{(y|m|d|h|i|s)+}/g, (result, key) => {
    let value = formatObj[key as keyof typeof formatObj]
    if (result.length > 0 && value < 10 && value !== 0) {
      return `0${value}`
    }
    return String(value || '00')
  })
}

/**
 * 获取 `assets` 目录下的静态资源地址。
 *
 * @param photoName 文件名；未带后缀时会自动补 `.png`。
 * @param addPath 额外子目录，例如 `menu`。
 * @param options 配置项。
 * @returns 静态资源的完整 URL；如果本身已是 `http/https` 地址，则原样返回。
 *
 * @example
 * formatImg('logo')
 *
 * @example
 * formatImg('avatar.png', 'user')
 */
export function formatImg(photoName: string, addPath = '', { basePath = 'assets/images' }: FormatImgOptions = {}): string {
  if (photoName.startsWith('http') || photoName.startsWith('https')) {
    return photoName
  }
  if (photoName.indexOf('.') === -1) {
    photoName = photoName + '.png'
  }
  const addLastSlash = addPath.endsWith('/') || !addPath ? addPath : `${addPath}/`
  const addLastBasePathSlash = basePath.endsWith('/') || !basePath ? basePath : `${basePath}/`
  const mergeSrc = `${addLastSlash}${photoName}`
  return new URL(`../${addLastBasePathSlash}${mergeSrc}`, import.meta.url).href
}

/**
 * 按指定小数位格式化数字，并可附带前后缀、单位和千分位。
 *
 * @param value 需要格式化的值。
 * @param options 小数位数或配置项。
 * @returns 格式化后的字符串。
 *
 * @example
 * formatToFixed('22.1', 2)
 * // => '22.10'
 *
 * @example
 * formatToFixed('22 TB', { digit: 2, unit: false, prefix: '$' })
 * // => '$22.00'
 */
export function formatToFixed(value: unknown, options?: FormatToFixedOptions | number): string {
  if (typeof options === 'number') {
    options = { digit: options }
  }

  const finalOptions: Required<FormatToFixedOptions> = {
    digit: 2,
    prefix: '',
    suffix: '',
    unit: true,
    thousands: false,
    ...options,
  }
  const { digit, prefix, suffix, unit, thousands } = finalOptions

  const matches = ('' + value).match(/^([\d,]+)(\.?)(\d+)?(\D+)?$/)
  if (!matches) {
    return String(value)
  }

  const numericString = matches[1].replace(/\D/g, '')
  const decimalString = matches[3] ? `.${matches[3]}` : ''
  let finalUnit = matches[4] || ''
  let res = numericString

  if (isStringNumber(numericString) || isNumber(numericString)) {
    res = Number(numericString + decimalString).toFixed(digit)
  }

  if (thousands) {
    res = String(formatThousands(res))
  }

  if (!unit) {
    finalUnit = ''
  }

  return `${prefix}${res}${finalUnit}${suffix}`
}

/**
 * 将纯文本中的换行和制表符转换成可直接渲染的 HTML 片段。
 *
 * @param str 需要格式化的文本。
 * @returns 字符串输入会返回转换后的 HTML；非字符串输入会原样返回。
 *
 * @example
 * formatTextToHtml('第1行\n\t第2行')
 * // => '第1行<br>&nbsp;&nbsp;&nbsp;&nbsp;第2行'
 */
export function formatTextToHtml(str: string): string
export function formatTextToHtml<T>(str: T): T
export function formatTextToHtml(str: unknown): unknown {
  if (!str || typeof str !== 'string') {
    return str
  }

  str = str.replace(/\n/g, '<br>')
  str = str.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
  return str
}
