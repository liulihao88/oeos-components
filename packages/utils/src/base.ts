import { unref, isRef, toRaw } from '@vue/reactivity'
import type { AppContext, VNode } from 'vue'
import type { Ref } from '@vue/reactivity'
import { consola } from 'consola'
import { cloneDeep } from 'es-toolkit' // 这里不要lodash-es的原因是, 体积太大, 超过500kb无法打包
import { formatTime } from './format'
import { ElMessage, ElMessageBox, type ElMessageBoxOptions, type MessageOptions } from 'element-plus'

type Func<Args extends any[] = any[], Return = any> = (...args: Args) => Return
type StorageValue = unknown
type StorageMap = Record<string, any>
type MaybeRef<T> = T | Ref<T>
type WidthStyleResult = { width: string }
type ValidateTriggerType = 'blur' | 'change'
type ValidateInput = ValidateRules | ValidatePrimitiveValue
type ValidateRuleResult = {
  required?: boolean
  message?: string
  trigger?: ValidateTriggerType[]
  validator?: (rule: any, value: any, callback: (error?: Error) => void) => void
  min?: number
  max?: number
}
type ValidatePrimitiveValue = string | number | boolean | null | undefined
type UuidOptionItem<T = any> = { label: string; value: T }

interface ToastOptions extends Partial<MessageOptions> {
  /**
   * 调用前是否先关闭全部消息提示。
   */
  closeAll?: boolean
}

interface ClearStorageExcludeOptions {
  /**
   * 清空时需要保留的 key 列表。
   */
  exclude: string[]
}

type ClearStorageInput = string | string[] | ClearStorageExcludeOptions

interface ValidFormOptions {
  /**
   * 校验失败时的提示文案。
   */
  message?: string
  /**
   * 是否在提示文案后追加字段名。
   */
  detail?: boolean
  /**
   * 是否显示错误提示。
   */
  showMessage?: boolean
}

interface FormValidateTarget {
  validate: (callback: (valid: boolean, status: StorageMap) => void) => void
}

interface UuidOptions {
  /**
   * `email` 模式下的邮箱后缀，默认 `@qq.com`。
   */
  emailStr?: string
  /**
   * `time` 模式下追加的时间格式，默认 `{y}-{m}-{d} {h}:{i}:{s}`。
   */
  timeStr?: string
  /**
   * 生成结果前缀。
   */
  startStr?: string
  /**
   * 数组选项模式下的固定索引；不传时随机取值。
   */
  optionsIndex?: number | null
}

interface ValidateRules {
  /**
   * 校验失败提示文案。
   */
  message?: string
  /**
   * 最小值或最小长度。
   */
  min?: number
  /**
   * 最大值或最大长度。
   */
  max?: number
  /**
   * 对比值，例如 `same` 校验时使用。
   */
  value?: any
  /**
   * 自定义正则。
   */
  reg?: RegExp
  /**
   * 是否必填，默认 `true`。
   */
  required?: boolean
  /**
   * 触发时机，常用 `['blur', 'change']`。
   */
  trigger?: ValidateTriggerType[]
}

interface CopyOptions extends ToastOptions {
  /**
   * 是否隐藏复制成功提示。
   */
  hideToast?: boolean
}

type WidthInput = string | number | Ref<string | number>
type ConfirmMessage = string | VNode | (() => VNode)
type ConfirmAppendTarget = string | HTMLElement | null

interface ConfirmOptions extends ElMessageBoxOptions {
  /**
   * 追加到的挂载节点。支持 css 选择器、DOM 节点或 `null`。
   */
  appendTo?: ConfirmAppendTarget
  /**
   * 手动传入 appContext，处理多应用或嵌套弹窗场景。
   */
  appContext?: AppContext | null
}

interface TryCatchResult<T> {
  /**
   * 执行成功时返回的数据；失败时为 `null`。
   */
  data: T | null
  /**
   * 执行失败时返回的异常；成功时为 `null`。
   */
  error: any
}

type TryCatchTask<T> = Promise<T> | (() => T | Promise<T>)

function _getBrowserStorage(isSession = false): Storage | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return isSession ? window.sessionStorage : window.localStorage
  } catch (error) {
    return null
  }
}

function _parseStorageValue<T = any>(value: string | null): T | string | number | null {
  if (value == null) {
    return null
  }

  try {
    const parsed = JSON.parse(value)
    if (typeof parsed !== 'number') {
      return parsed
    }
  } catch (error) {}

  return value
}

/**
 * 显示消息提示。
 *
 * 支持三种常见写法：
 * 1. `$toast('保存成功')`
 * 2. `$toast('保存失败', 'e')`
 * 3. `$toast({ message: '自定义', type: 'warning' })`
 *
 * @param message 提示内容，支持纯文本、VNode、渲染函数，或完整配置对象。
 * @param type 提示类型，支持 `success/info/error/warning` 和简写 `s/i/e/w`，也支持直接传配置对象。
 * @param otherParams 额外配置，例如 `duration`、`customClass`、`closeAll`。
 * @returns 无返回值。
 *
 * @example
 * $toast('保存成功')
 *
 * @example
 * $toast('保存失败', 'e')
 *
 * @example
 * $toast({
 *   message: '自定义提示',
 *   type: 'warning',
 *   duration: 1000,
 *   closeAll: true,
 * })
 */
type MessageType = 'success' | 'info' | 'error' | 'warning'
type ShortType = 's' | 'i' | 'e' | 'w'
type ToastType = MessageType | ShortType

export function $toast(
  message: string | ToastOptions | VNode | (() => VNode),
  type: ToastType | ToastOptions = 'success',
  otherParams: ToastOptions = {},
): void {
  const typeMap: Record<ShortType, MessageType> = {
    s: 'success',
    i: 'info',
    e: 'error',
    w: 'warning',
  }

  function isShortType(t: any): t is ShortType {
    return ['s', 'i', 'e', 'w'].includes(t)
  }

  function isToastOptions(obj: any): obj is ToastOptions {
    return typeof obj === 'object' && obj !== null
  }

  // Case 1: message is options object
  if (isToastOptions(message)) {
    if (message.closeAll) {
      ElMessage.closeAll()
    }
    message.customClass = message.customClass === 'el' ? '' : 'o-antd-message'
    ElMessage(message)
    return
  }

  // Case 2: type is options object
  if (isToastOptions(type)) {
    if (type.closeAll) {
      ElMessage.closeAll()
    }
    type.customClass = type.customClass === 'el' ? '' : 'o-antd-message'
    ElMessage({
      message,
      type: 'success',
      ...type,
    })
    return
  }

  // Case 3: regular message with type and options
  if (otherParams.closeAll) {
    ElMessage.closeAll()
  }

  const resolvedType = isShortType(type) ? typeMap[type] : type

  otherParams.customClass = otherParams.customClass === 'el' ? '' : 'o-antd-message'
  ElMessage({
    message,
    type: resolvedType,
    ...otherParams,
  })
}

/**
 * `$toast.success(...)` 的快捷调用。
 */
$toast.success = (message: string | ToastOptions | VNode | (() => VNode), otherParams: ToastOptions = {}) =>
  $toast(message, 'success', otherParams)
/**
 * `$toast.info(...)` 的快捷调用。
 */
$toast.info = (message: string | ToastOptions | VNode | (() => VNode), otherParams: ToastOptions = {}) =>
  $toast(message, 'info', otherParams)
/**
 * `$toast.error(...)` 的快捷调用。
 */
$toast.error = (message: string | ToastOptions | VNode | (() => VNode), otherParams: ToastOptions = {}) =>
  $toast(message, 'error', otherParams)
/**
 * `$toast.warning(...)` 的快捷调用。
 */
$toast.warning = (message: string | ToastOptions | VNode | (() => VNode), otherParams: ToastOptions = {}) =>
  $toast(message, 'warning', otherParams)

/**
 * 写入浏览器缓存。
 *
 * @param storageName 缓存 key。
 * @param params 要保存的值；对象和数组会自动序列化。
 * @param isSession 是否写入 `sessionStorage`；默认写入 `localStorage`。
 * 在 SSR / Node 环境下会自动跳过，不会抛错。
 *
 * @example
 * setStorage('token', 'abc123')
 *
 * @example
 * setStorage('userInfo', { id: 1, name: 'andy' }, true)
 */
export function setStorage(storageName: string, params: StorageValue, isSession = false): void {
  const storage = _getBrowserStorage(isSession)
  if (!storage) {
    return
  }

  let handleParams
  if (typeof params === 'number' || typeof params === 'string') {
    handleParams = params
  } else {
    handleParams = JSON.stringify(params)
  }
  storage.setItem(storageName, handleParams)
}

/**
 * 读取浏览器缓存。
 *
 * @param data 缓存 key。
 * @param isSession 是否从 `sessionStorage` 读取；默认从 `localStorage` 读取。
 * @returns 读取到的缓存值；不存在或在 SSR 环境下时返回 `null`。
 *
 * @example
 * const token = getStorage('token')
 *
 * @example
 * const userInfo = getStorage('userInfo', true)
 */
export function getStorage<T = any>(data: string, isSession = false): T | string | number | null {
  const storage = _getBrowserStorage(isSession)
  if (!storage) {
    return null
  }

  return _parseStorageValue<T>(storage.getItem(data))
}

/**
 * 清空浏览器缓存。
 *
 * @param str 要清空的 key；不传时清空全部，传 `exclude` 时表示保留指定 key。
 * @returns 无返回值。
 * 在 SSR / Node 环境下会自动跳过。
 *
 * @example
 * clearStorage()
 *
 * @example
 * clearStorage('loginId')
 *
 * @example
 * clearStorage({ exclude: ['token', 'theme'] })
 */
export function clearStorage(str: ClearStorageInput = ''): void {
  const sessionStorageRef = _getBrowserStorage(true)
  const localStorageRef = _getBrowserStorage(false)

  if (!sessionStorageRef && !localStorageRef) {
    return
  }

  if (isEmpty(str)) {
    sessionStorageRef?.clear()
    localStorageRef?.clear()
  }
  if (!isEmpty(str) && getType(str) !== 'object') {
    let strArr = Array.isArray(str) ? str : [str]
    for (let i = 0; i < strArr.length; i++) {
      sessionStorageRef?.removeItem(strArr[i])
      localStorageRef?.removeItem(strArr[i])
    }
  }
  if (_isObjectWithExclude(str)) {
    if (!isEmpty(str.exclude) && getType(str) === 'object') {
      let sessionStorageObj = {}
      let localStorageObj = {}
      for (const key in str.exclude) {
        if (Object.prototype.hasOwnProperty.call(str.exclude, key)) {
          const name = str.exclude[key]
          if (getStorage(name)) {
            localStorageObj[name] = getStorage(name)
          }
          if (getStorage(name, true)) {
            sessionStorageObj[name] = getStorage(name, true)
          }
        }
      }
      sessionStorageRef?.clear()
      localStorageRef?.clear()
      for (const key in sessionStorageObj) {
        setStorage(key, sessionStorageObj[key], true)
      }
      for (const key in localStorageObj) {
        setStorage(key, localStorageObj[key])
      }
    }
  }
}
// 自定义类型守卫函数
function _isObjectWithExclude(obj: ClearStorageInput): obj is ClearStorageExcludeOptions {
  return typeof obj === 'object' && obj !== null && 'exclude' in obj && typeof obj.exclude === 'object'
}

/**
 * 将 Element Plus 表单校验封装为 Promise。
 *
 * @param ref 表单实例或表单实例的 `ref`。
 * @param options 校验配置。
 * @returns 校验通过时返回表单状态对象，失败时 reject 对应状态对象。
 *
 * @example
 * await validForm(formRef)
 *
 * @example
 * await validForm(formRef, { message: '请检查表单信息', detail: true })
 */
export function validForm(
  ref: MaybeRef<FormValidateTarget>,
  { message = '表单校验错误, 请检查', detail = false, showMessage = true }: ValidFormOptions = {},
): Promise<StorageMap> {
  return new Promise((resolve, reject) => {
    unref(ref).validate((valid, status) => {
      if (valid) {
        resolve(status)
      } else {
        if (message && showMessage) {
          let errorText = Object.keys(status)
          let toastMessage = message
          if (detail) {
            toastMessage = message + errorText.join(',')
          }
          $toast(toastMessage, 'e')
        }
        reject(status)
      }
    })
  })
}

function isPlainObject(data: any): boolean {
  if (Object.prototype.toString.call(data) !== '[object Object]') {
    return false
  }

  const proto = Object.getPrototypeOf(data)
  return proto === Object.prototype || proto === null
}

/**
 * 判断值是否为空。
 *
 * 默认采用更安全的“结构空值”语义：
 * `undefined`、`null`、空字符串、空数组、空对象、`NaN`、空 `Map` / `Set`、无效日期会返回 `true`。
 *
 * @param data 要判断的值。
 * @param strict 是否使用严格模式。默认 `true`；传 `false` 时会沿用旧语义，把 `0` 和 `false` 也视为空值。
 * @returns 是否为空。
 *
 * @example
 * isEmpty('   ')
 * // => true
 *
 * @example
 * isEmpty(0)
 * // => false
 *
 * @example
 * isEmpty(0, false)
 * // => true
 */
export function isEmpty(data: any, strict = true): boolean {
  if (isRef(data)) {
    data = unref(data)
  }

  // 处理 null/undefined
  if (data == null) return true
  // 如果是日期对象，检查它是否是有效的日期
  if (data instanceof Date) {
    return Number.isNaN(data.getTime())
  }
  // 处理基础类型
  switch (typeof data) {
    case 'string':
      return data.trim().length === 0
    case 'boolean':
      return strict ? false : !data
    case 'number':
      return Number.isNaN(data) || (!strict && data === 0)
    case 'symbol':
      return false
    case 'bigint':
      return strict ? false : data === BigInt(0)
    case 'function':
      return false
  }
  // 处理集合类型
  if (data instanceof Map || data instanceof Set) return data.size === 0
  // 处理数组
  if (Array.isArray(data)) {
    return data.length === 0
  }

  // 只把 plain object 当作普通对象判断，避免误伤 Promise / RegExp / Error 等实例
  if (isPlainObject(data)) {
    return Reflect.ownKeys(data).length === 0
  }

  return false
}

/**
 * 合并两个对象。
 *
 * 当同名字段同时有值时，以第二个对象为准；当其中一个字段为空时，保留有值的一侧。
 *
 * @param obj1 第一个对象。
 * @param obj2 第二个对象。
 * @returns 合并后的对象。
 *
 * @example
 * merge(
 *   { name: '', age: 18, city: 'beijing' },
 *   { name: 'andy', age: 20, city: '' },
 * )
 */
export function merge<T extends StorageMap, U extends StorageMap>(obj1: T, obj2: U): T & U {
  let merged = { ...obj1, ...obj2 }
  for (let key in merged) {
    if (!isEmpty(obj1[key]) && !isEmpty(obj2[key])) {
      merged[key] = obj2[key]
    } else if (isEmpty(obj1[key]) && !isEmpty(obj2[key])) {
      merged[key] = obj2[key]
    } else if (!isEmpty(obj1[key]) && isEmpty(obj2[key])) {
      merged[key] = obj1[key]
    }
  }
  return merged as T & U
}

/**
 * 深拷贝数据；传入数组时可按次数重复展开。
 *
 * @param data 要克隆的数据。
 * @param times 当 `data` 是数组时的复制次数，默认 `1`。
 * @returns 克隆后的数据。
 *
 * @example
 * clone({ name: 'andy', info: { id: 1 } })
 *
 * @example
 * clone([1, 2, { name: 'andy' }], 2)
 * // => [1, 2, { name: 'andy' }, 1, 2, { name: 'andy' }]
 */
export function clone<T>(data: T[], times?: number): T[]
export function clone<T>(data: T, times?: number): T
export function clone<T>(data: T, times = 1): T {
  if (isRef(data)) {
    data = unref(data)
  }
  // Check if the data is not an array
  if (getType(data) !== 'array') {
    // If not an array, return a deep clone of the data
    return cloneDeep(data)
  }
  const clonedData = cloneDeep(data)
  const result: typeof clonedData = []
  for (let i = 0; i < times; i++) {
    result.push(...clonedData)
  }
  return result
}

/**
 * 生成随机字符串，也支持手机号、邮箱、时间、数字、IP、端口等特殊模式。
 *
 * @param type 生成模式，支持空字符串、`phone`、`email`、`time`、`number`、`ip`、`port`，也支持传选项数组。
 * @param length 随机字符串或数字的长度，默认 `4`。
 * @param options 额外配置。
 * @returns 生成结果。
 *
 * @example
 * uuid()
 * // => 'aB3d'
 *
 * @example
 * uuid('phone')
 * // => '13603312460'
 *
 * @example
 * uuid('time', 0, { startStr: 'andy', timeStr: '{h}:{i}:{s}' })
 */
export function uuid(
  type: string | Array<UuidOptionItem> = '',
  length = 4,
  options: UuidOptions = {},
): string | number | any {
  const { emailStr = '@qq.com', timeStr = '{y}-{m}-{d} {h}:{i}:{s}', startStr = '', optionsIndex = null } = options

  // 辅助函数：判断是否为ref对象
  function isRef(obj: any): obj is Ref<any> {
    return obj && typeof obj === 'object' && obj._isRef === true
  }

  // 辅助函数：获取ref的实际值
  function unref<T>(ref: Ref<T> | T): T {
    return isRef(ref) ? ref.value : ref
  }

  // 辅助函数：生成随机数
  function random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  // 解包可能为ref的参数
  type = unref(type)

  // 处理数组类型参数（下拉框选项）
  if (Array.isArray(type)) {
    if (type.length === 0) return ''

    const randIndex = optionsIndex ?? random(0, type.length - 1)
    const selectedItem = type[randIndex]

    // 如果数组项是对象且有value属性，则返回value
    if (typeof selectedItem === 'object' && selectedItem !== null && 'value' in selectedItem) {
      return selectedItem.value
    }

    // 否则直接返回数组项
    return selectedItem
  }

  // 生成随机字符串
  let randomChars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  let result = startStr

  // 生成手机号
  if (type === 'phone') {
    const prefixes = ['130', '131', '132', '133', '135', '136', '137', '138', '170', '187', '189']
    result = prefixes[random(0, prefixes.length - 1)]

    for (let i = 0; i < 8; i++) {
      result += Math.floor(Math.random() * 10)
    }
    return result
  }

  // 生成邮箱
  if (type === 'email') {
    result = uuid(startStr, length) + emailStr
    return result
  }

  // 生成时间
  if (type === 'time') {
    return uuid(startStr, length, options) + ' ' + formatTime(new Date(), timeStr)
  }

  // 生成数字
  if (type === 'number') {
    const numChars = '123456789'
    result = ''

    for (let i = 0; i < length; i++) {
      result += numChars[random(0, numChars.length - 1)]
    }
    return Number(result)
  }

  // 生成IP地址
  if (type === 'ip') {
    const randomNum = random(1, 99)
    return `10.0.11.${randomNum}`
  }

  // 生成端口号
  if (type === 'port') {
    return random(1, 65535)
  }

  // 生成普通随机字符串
  for (let i = 0; i < length; i++) {
    result += randomChars[random(0, randomChars.length - 1)]
  }

  return result
}

/**
 * 获取值的原始类型名称，返回值统一为小写字符串。
 *
 * @param type 要判断的值。
 * @returns 类型名称，例如 `array`、`date`、`object`、`null`。
 *
 * @example
 * getType(new RegExp())
 * // => 'regexp'
 *
 * @example
 * getType([])
 * // => 'array'
 */
export function getType(type: unknown): string {
  if (typeof type === 'object') {
    const objType = Object.prototype.toString.call(type).slice(8, -1).toLowerCase()
    return objType
  } else {
    return typeof type
  }
}

/**
 * 一个辅助函数，用于在代码中创建一个暂停（延迟）。
 * 它返回一个 Promise，你可以在 `await` 后使用它来实现类似 "sleep" 的效果。
 *
 * @param delay - 等待的毫秒数。默认值为 0，表示不延迟。
 * @param fn - (可选) 一个在延迟结束后立即执行的函数。
 *
 * @returns 一个 Promise，当延迟结束后解析（resolve）。
 *
 * @example
 * // 基本用法：延迟 2 秒后打印消息
 * console.log('开始');
 * await sleep(2000);
 * console.log('2秒后执行');
 *
 * @example
 * // 带回调函数的用法：延迟 1 秒后执行清理工作
 * sleep(1000, () => {
 *   console.log('执行清理操作...');
 *   // 清理代码...
 * });
 *
 * @example
 * // 在循环中使用：每次迭代后延迟 500 毫秒
 * for (let i = 0; i < 5; i++) {
 *   console.log(`当前值: ${i}`);
 *   await sleep(500);
 * }
 */
export function sleep(delay: number = 0, fn?: () => void) {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      fn?.()
      resolve()
    }, delay),
  )
}

/**
 * 为 `validate` 预置默认触发时机 `['blur', 'change']`。
 *
 * @param type 校验类型。
 * @param rules 校验规则。
 * @param pureValid 是否直接返回布尔值。
 * @returns 与 `validate` 一致。
 *
 * @example
 * const rule = validateTrigger('required', { message: '请输入名称' })
 */
export function validateTrigger(type = 'required', rules: ValidateRules = {}, pureValid = false) {
  let mergeRules = {
    trigger: ['blur', 'change'] as ValidateTriggerType[],
    ...rules,
  }
  return validate(type, mergeRules, pureValid)
}

/**
 * 生成 Element Plus 表单校验规则，或直接执行纯校验。
 *
 * @example
 * const mobileRule = validate('mobile')
 *
 * @example
 * const rangeRule = validate('between', { min: 1, max: 99 })
 *
 * @example
 * const isIp = validate('ip', '192.168.1.1', true)
 *
 * @param type 校验类型；如果传入的值不在内置类型列表中，则会直接作为错误提示文案使用。
 * @param rules 校验规则配置，或在 `pureValid=true` 时直接传待校验值。
 * @param pureValid 是否直接返回布尔值。
 * @returns `pureValid=true` 时返回布尔值，否则返回 Element Plus 规则对象。
 */
// 定义验证类型枚举
enum ValidateType {
  REQUIRED = 'required',
  PASSWORD = 'password',
  NUMBER = 'number',
  POSITIVE = 'positive',
  ZERO_POSITIVE = 'zeroPositive',
  INTEGER = 'integer',
  DECIMAL = 'decimal',
  MOBILE = 'mobile',
  EMAIL = 'email',
  IP = 'ip',
  PORT = 'port',
  BETWEEN = 'between',
  LENGTH = 'length',
  SAME = 'same',
  CUSTOM = 'custom',
}

export function validate(type: string = 'required', rules: ValidateInput = {}, pureValid = false): ValidateRuleResult | boolean {
  const rulesObject: ValidateRules = typeof rules === 'object' && rules !== null ? rules : {}
  let trigger = rulesObject.trigger || []
  // 使用枚举值组成的联合类型来确保类型安全
  const typeMaps = Object.values(ValidateType) as string[]
  let parseRequired = rulesObject.required ?? true

  // 如果不包含typeMaps中的类型, 直接将第一个参数作为message
  if (!typeMaps.includes(type)) {
    return {
      required: parseRequired,
      message: type,
      trigger: trigger,
    }
  }
  if (type === ValidateType.REQUIRED) {
    return {
      required: parseRequired,
      message: rulesObject.message ?? '请输入',
      trigger: trigger,
    }
  }

  // validator: this.validateName,
  if (type === ValidateType.PASSWORD) {
    const validateName = (rule: any, value: any, callback: (error?: Error) => void) => {
      let validFlag = /^[a-zA-Z0-9_-]+$/.test(value)
      if (!validFlag) {
        callback(new Error(rulesObject.message || '密码只能由英文、数字、下划线、中划线组成'))
      } else {
        callback()
      }
    }
    return {
      validator: validateName,
      trigger: trigger,
    }
  }
  if (type === ValidateType.POSITIVE || type === ValidateType.NUMBER) {
    // 正整数
    return _validValue(rules, '请输入正整数', pureValid, /^[1-9]+\d*$/)
  }
  if (type === ValidateType.ZERO_POSITIVE) {
    // 正整数且包含0
    return _validValue(rules, '请输入非负整数', pureValid, /^(0|[1-9]+\d*)$/)
  }
  // 整数, 包含负数和0
  if (type === ValidateType.INTEGER) {
    return _validValue(rules, '请输入整数', pureValid, /^(0|[-]?[1-9]\d*)$/)
  }
  // 非负数, 整数和最多2位小数
  if (type === ValidateType.DECIMAL) {
    return _validValue(rules, '请输入非负数字, 包含小数且最多2位', pureValid, /(0|[1-9]\d*)(\.\d{1, 2})?|0\.\d{1,2}/)
  }
  if (type === ValidateType.MOBILE) {
    return _validValue(rules, '请输入正确的手机号', pureValid, /^[1][0-9]{10}$/)
  }
  if (type === ValidateType.EMAIL) {
    return _validValue(rules, '请输入正确的email', pureValid, /^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  }
  if (type === ValidateType.IP) {
    return _validValue(
      rules,
      '请输入正确的ip地址',
      pureValid,
      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    )
  }
  if (type === ValidateType.PORT) {
    return _validValue(
      rules,
      '请输入1-65535的端口号',
      pureValid,
      /^([1-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-5][0-5][0-3][0-5])$/,
    )
  }
  if (type === ValidateType.BETWEEN) {
    let min = rulesObject.min
    let max = rulesObject.max
    const validateBetween = (rule: any, value: any, callback: (error?: Error) => void) => {
      let validFlag = /^-?[0-9]+$/.test(value)
      if (!validFlag) {
        callback(new Error('请输入数字'))
      }
      if (value < min && min !== undefined) {
        callback(new Error(`数字不能小于${min}`))
      }
      if (value > max && max !== undefined) {
        callback(new Error(`数字不能大于${max}`))
      }
      callback()
    }
    return {
      validator: validateBetween,
      trigger: trigger,
      required: parseRequired,
    }
  }
  if (type === ValidateType.LENGTH) {
    return {
      min: rulesObject.min,
      max: rulesObject.max,
      message: rulesObject.message ?? `请输入${rulesObject.min}到${rulesObject.max}个字符`,
      trigger: trigger,
      required: parseRequired,
    }
  }

  if (type === ValidateType.SAME) {
    const validateSame = (rule: any, value: any, callback: (error?: Error) => void) => {
      let isSame = value === rulesObject.value
      if (!isSame) {
        const errMessage = rulesObject.message || '密码和确认密码要一致'
        callback(new Error(errMessage))
      }
      if (parseRequired && !value) {
        callback(new Error(rulesObject.message || '请输入'))
      }
      callback()
    }
    let res = {
      validator: validateSame,
      trigger: trigger,
      required: parseRequired,
    }
    return res
  }
  if (type === ValidateType.CUSTOM) {
    //  _validValue(rules, '请输入正确的手机号', pureValid, /^[1][0-9]{10}$/)
    if (pureValid) {
      return _validValue(rulesObject.value, rulesObject.message, pureValid, rulesObject.reg!)
    } else {
      return _validValue(rulesObject, rulesObject.message, pureValid, rulesObject.reg!)
    }
  }

  function _validValue(rules: any, msg: string | undefined, pureValid: boolean, reg: RegExp) {
    if (pureValid === true) {
      return reg.test(rules)
    }
    const validatePhone = (rule: any, value: any, callback: (error?: Error) => void) => {
      let validFlag = reg.test(value)
      if (!validFlag) {
        callback(new Error(rules.message ?? msg))
      } else {
        callback()
      }
    }
    return {
      validator: validatePhone,
      required: rules.required ?? true,
      trigger: trigger,
    }
  }
}

/**
 * 复制文本到剪贴板。
 *
 * @param text 需要复制的文本。
 * @param toastParams 提示配置；传 `hideToast: true` 时不显示成功提示。
 * @returns 是否复制成功。
 *
 * @example
 * copy('这是要复制的文本')
 *
 * @example
 * copy('静默复制', { hideToast: true })
 */
export const copy = (text: string, toastParams: CopyOptions = {}): boolean => {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
  if (!toastParams.hideToast) {
    // 确保我们传递给$toast的是一个有效的ToastOptions对象
    const { hideToast, ...toastOptions } = toastParams
    $toast(text + '复制成功', toastOptions)
    return true
  }
  return true
}

/**
 * 带变量名的日志输出封装。
 *
 * @param variableStr 变量名或标签名。
 * @param variable 需要打印的值。
 * @param otherInfo 附加信息，常用于手动传入文件路径。
 *
 * @example
 * const formData = { id: 1, name: 'andy' }
 * log('formData', formData)
 */
export function log(variableStr: string, variable: unknown, otherInfo = ''): void {
  const stack = new Error().stack.split('\n')[2].trim() // 获取调用堆栈的第二行
  const matchResult = stack.match(/\((.*):(\d+):(\d+)\)/)
  let fileInfo = ''
  try {
    if (matchResult && otherInfo) {
      const lineNumber = matchResult[2]
      fileInfo = `vscode://file${JSON.parse(otherInfo)}:${lineNumber}`
    }
  } catch (error) {
    fileInfo = otherInfo
  }

  if (isRef(variable)) {
    let unrefVariable = unref(variable)
    _log(toRaw(unrefVariable))
  } else {
    _log(variable)
  }
  function _log(consoleData) {
    if (getType(consoleData) === 'object' || getType(consoleData) === 'array') {
      consola.log(
        `%c${variableStr} `,
        'background:#fff; color: blue;font-size: 0.8em',
        JSON.stringify(consoleData, null, '\t'),
        `${fileInfo}`,
      )
    } else {
      consola.log(`%c${variableStr} `, 'background:#fff; color: blue;font-size: 0.8em', consoleData, `${fileInfo}`)
    }
  }
  function getType(type) {
    if (typeof type === 'object') {
      const objType = Object.prototype.toString.call(type).slice(8, -1).toLowerCase()
      return objType
    } else {
      return typeof type
    }
  }
}

/**
 * 生成指定范围内的随机整数。
 *
 * @param min 最小值，默认 `0`。
 * @param max 最大值，默认 `10`。
 * @returns 随机整数。
 *
 * @example
 * random()
 *
 * @example
 * random(100, 999)
 */
export function random(min = 0, max = 10): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 将驼峰命名转换为连接符命名。
 *
 * @param text 要转换的文本。
 * @param connect 连接符，默认 `-`。
 * @returns 转换后的文本。
 *
 * @example
 * toLine('NameAndy')
 * // => 'name-andy'
 *
 * @example
 * toLine('CompTitle', '_')
 * // => 'comp_title'
 */
export function toLine(text: string, connect = '-'): string {
  let translateText = text
    .replace(/([A-Z])/g, (match, p1, offset, origin) => {
      if (offset === 0) {
        return `${match.toLocaleLowerCase()}`
      } else {
        return `${connect}${match.toLocaleLowerCase()}`
      }
    })
    .toLocaleLowerCase()
  return translateText
}

const _CSS_UNIT_RE = /^[0-9]+(\.[0-9]+)?(px|%|em|rem|vw|vh|ch)$/
/**
 * 将宽度值规范化为可直接用于样式的结果。
 *
 * @param initValue 宽度值，支持数字、数字字符串、CSS 长度字符串和 `ref`。
 * @param isBase 为 `true` 时直接返回宽度字符串；否则返回 `{ width }` 对象。
 * @returns 宽度字符串或宽度样式对象；无效值返回空字符串或空对象。
 *
 * @example
 * processWidth(200)
 * // => { width: '200px' }
 *
 * @example
 * processWidth('50%', true)
 * // => '50%'
 */
export function processWidth(initValue: WidthInput, isBase: true): string
export function processWidth(initValue: WidthInput, isBase?: false): WidthStyleResult | {}
export function processWidth(initValue: WidthInput, isBase = false): WidthStyleResult | {} | string {
  const raw = unref(initValue)

  if (!raw) {
    return isBase ? '' : {}
  }

  const str = typeof raw === 'number' ? `${raw}` : raw

  let res: string
  if (!isNaN(Number(str))) {
    res = str + 'px'
  } else if (_CSS_UNIT_RE.test(str)) {
    res = str
  } else {
    return isBase ? '' : {}
  }

  return isBase ? res : { width: res }
}

/**
 * 创建节流函数。
 *
 * @param fn 需要节流执行的函数。
 * @param delay 节流间隔，单位毫秒，默认 `1000`。
 * @returns 节流后的函数。
 *
 * @example
 * const onResize = throttle(() => {
 *   console.log('resize')
 * }, 300)
 */
export function throttle<T extends Func>(fn: T, delay = 1000): (...args: Parameters<T>) => void {
  // last为上一次触发毁掉的时间，timer是定时器
  let last = 0
  let timer: ReturnType<typeof setTimeout> | undefined = undefined
  // 将throttle处理结果当做函数返回
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    // 保留调用时的this上下文
    let context = this
    // 记录本次触发回调的时间
    let now = +new Date()
    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last < delay) {
      // 如果时间间隔小于设定的时间间隔阈值,则为本次触发操作设立一个新的定时器
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        fn.apply(context, args as any)
      }, delay)
    } else {
      // 如果时间间隔超出了设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
      last = now
      fn.apply(context, args as any)
    }
  }
}

/**
 * 统一处理 Promise 或任务函数执行结果。
 *
 * 推荐优先传入函数，这样可以同时捕获同步 `throw` 和异步 `reject`。
 *
 * @param task Promise，或返回值 / Promise 的函数。
 * @param sendLoading 可选的 loading `ref`。
 * @returns 包含 `data` 和 `error` 的结果对象。
 *
 * @example
 * const loading = ref(false)
 * const { data, error } = await tryCatch(() => fetchUserData(), loading)
 *
 * @example
 * const { data, error } = await tryCatch(Promise.resolve({ id: 1 }))
 *
 * @example
 * const { data, error } = await tryCatch(() => {
 *   if (!form.name) throw new Error('请输入名称')
 *   return submitForm(form)
 * })
 */
export function tryCatch<T>(
  task: Promise<T>,
  sendLoading?: Ref<boolean> | null,
): Promise<TryCatchResult<T>>
export function tryCatch<T>(
  task: () => T | Promise<T>,
  sendLoading?: Ref<boolean> | null,
): Promise<TryCatchResult<T>>
export async function tryCatch<T>(
  task: TryCatchTask<T>,
  sendLoading?: Ref<boolean> | null,
): Promise<TryCatchResult<T>> {
  const updateLoading = (value: boolean): void => {
    if (isRef(sendLoading)) {
      sendLoading.value = value
    } else if (sendLoading !== undefined && sendLoading !== null) {
      console.warn('Cannot modify non-ref sendLoading directly!')
    }
  }

  updateLoading(true)

  try {
    const data = typeof task === 'function' ? await task() : await task
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error }
  } finally {
    updateLoading(false)
  }
}

/**
 * 防抖函数返回值类型。
 */
type DebouncedFunction<T extends Func> = ((...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>) & {
  cancel: () => void
}

/**
 * 创建防抖函数。
 *
 * @param func 需要防抖执行的函数。
 * @param delay 延迟时间，单位毫秒，默认 `500`。
 * @param immediate 是否在第一次调用时立即执行。
 * @param resultCallback 每次真正执行后触发的结果回调。
 * @returns 带 `cancel()` 方法的防抖函数。
 *
 * @example
 * const search = debounce((keyword: string) => {
 *   return keyword.trim()
 * }, 300)
 *
 * await search('oeos')
 */
export function debounce<T extends Func>(
  func: T,
  delay: number = 500,
  immediate?: boolean,
  resultCallback?: (result: ReturnType<T>) => void,
): DebouncedFunction<T> {
  let timer: null | ReturnType<typeof setTimeout> = null
  let isInvoke = false
  const _debounce = function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    return new Promise((resolve, reject) => {
      if (timer) clearTimeout(timer)
      if (immediate && !isInvoke) {
        try {
          const result = func.apply(this, args)
          if (resultCallback) resultCallback(result)
          resolve(result)
        } catch (e) {
          reject(e)
        }
        isInvoke = true
      } else {
        timer = setTimeout(() => {
          try {
            const result = func.apply(this, args)
            if (resultCallback) resultCallback(result)
            resolve(result)
          } catch (e) {
            reject(e)
          }
          isInvoke = false
          timer = null
        }, delay)
      }
    })
  } as DebouncedFunction<T>
  _debounce.cancel = function () {
    if (timer) clearTimeout(timer)
    isInvoke = false
    timer = null
  }
  return _debounce
}

/**
 * 打开确认框。
 *
 * 相比直接调用 `ElMessageBox.confirm`，这里额外处理了默认参数、嵌套弹窗挂载点和 `appContext`。
 *
 * @param message 确认框内容，支持字符串、VNode 或渲染函数。
 * @param options MessageBox 配置项。
 * @param appContext 可选的 Vue 应用上下文。
 * @returns `ElMessageBox.confirm` 返回的 Promise。
 *
 * @example
 * await confirm('确定删除吗？')
 *
 * @example
 * await confirm('确认提交？', {
 *   showCancelButton: true,
 *   appendTo: '#dialogRoot',
 * })
 */
export function confirm(message: ConfirmMessage, options: ConfirmOptions = {}, appContext: AppContext | null = null) {
  const resolvedMessage = typeof message === 'function' ? message() : message
  const resolvedAppendTo = _resolveAppendTarget(options?.appendTo)
  const resolvedAppContext = _resolveAppContext(options?.appContext || appContext)

  const mergeOptions = {
    title: '提示',
    draggable: true,
    showCancelButton: false,
    confirmButtonText: '确定',
    dangerouslyUseHTMLString: true,
    ...options,
    appendTo: resolvedAppendTo,
    appContext: resolvedAppContext,
  }

  return ElMessageBox.confirm(resolvedMessage, mergeOptions)
}

function _resolveAppendTarget(appendTo?: ConfirmAppendTarget) {
  if (typeof document === 'undefined') {
    return appendTo
  }

  if (appendTo instanceof HTMLElement) {
    return appendTo
  }

  if (typeof appendTo === 'string' && appendTo.trim()) {
    const rawSelector = appendTo.trim()

    try {
      const selector =
        rawSelector.startsWith('#') || rawSelector.startsWith('.') || rawSelector.startsWith('[')
          ? rawSelector
          : `#${rawSelector}`

      return document.querySelector(selector) || appendTo
    } catch (error) {
      return appendTo
    }
  }

  const overlayList = Array.from(document.querySelectorAll<HTMLElement>('.el-overlay'))
  const dialogOverlay = overlayList
    .filter((item) => {
      if (!item.isConnected || item.style.display === 'none') {
        return false
      }

      const containsDialog = item.querySelector('.el-dialog, .el-drawer')
      const containsMessageBox = item.querySelector('.el-message-box')

      return !!containsDialog && !containsMessageBox
    })
    .at(-1)

  return dialogOverlay || appendTo
}

function _resolveAppContext(appContext: AppContext | null | undefined) {
  if (appContext) {
    return appContext
  }

  if (typeof document === 'undefined') {
    return ElMessageBox.install?.context || ElMessageBox._context
  }

  return ElMessageBox.install?.context || ElMessageBox._context || document.querySelector('#app')?._vue_app?._context
}

/**
 * 读取根节点上的 CSS 自定义变量。
 *
 * @param propertyName CSS 变量名，例如 `--blue`。
 * @returns CSS 变量的值。
 *
 * @example
 * getVariable('--vp-c-brand-1')
 */
export function getVariable(propertyName: string): string {
  let res = getComputedStyle(document.documentElement).getPropertyValue(propertyName).trim()
  return res
}

declare const __OEOS_UTILS_BUILD_TIME__: string

/**
 * 返回当前 utils 包的构建时间。
 *
 * @returns 构建时间字符串。
 *
 * @example
 * test()
 */
export function test(): string {
  return `build time: ${__OEOS_UTILS_BUILD_TIME__}`
}
