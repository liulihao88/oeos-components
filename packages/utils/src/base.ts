import { unref, isRef, toRaw } from '@vue/reactivity'
import type { VNode } from 'vue'
import type { Ref } from '@vue/reactivity'
import { consola } from 'consola'
import { cloneDeep } from 'es-toolkit' // 这里不要lodash-es的原因是, 体积太大, 超过500kb无法打包
import { ElMessage, ElMessageBox, MessageOptions } from 'element-plus'

type Func = (...args: any[]) => any

/**
 * 现有方法如下
 * $toast(message, type: string | object = 'success', otherParams: object = {})
 * setStorage(storageName: string, params: any, isSession = false)
 * getStorage(data, isSession = false)
 * clearStorage(str: string | [] | object = '')
 * validForm(ref, { message = '表单校验错误, 请检查', detail = false, showMessage = true } = {})
 * isEmpty(data: any): boolean
 * notEmpty(v: any): boolean
 * merge(obj1: object, obj2: object): object
 * clone(data, times = 1)
 * uuid(type = '',length = 4,{ emailStr = '@qq.com', timeStr = '{m}-{d} {h}:{i}:{s}', startStr = '', optionsIndex = null } = {},)
 * getType(type)
 * sleep(delay = 0, fn?: () => void)
 * validate(type = 'required', rules = {}, pureValid = false)
 * asyncWrapper(func, ...args)
 * copy = (text, toastParams = {})
 * log(variableStr, variable, otherInfo = '')
 * random(min = 0, max = 10)
 * toLine(text, connect = '-')
 * processWidth(initValue, isBase = false)
 * throttle(fn, delay = 1000)
 * debounce(fn, delay = 1000)
 * confirm(message, options)
 * getVariable('--green')
 */

/**
 * @example1
  proxy.$toast('保存成功') // s:success; i: info; w: warning; e: error;  
  proxy.$toast('保存失败', 'e')
  proxy.$toast('永不关闭', {duration: 0})
  proxy.$toast({
    message: 'andy',
    type: 'warning',
    duration: 300,
    closeAll: true,
  })
* $toast.success('This is a success message')
* @example2 显示对象 
* $toast({
    dangerouslyUseHTMLString: true,
    message: `<h6>复制成功</h6><pre>${JSON.stringify(obj, null, 2)}</pre>`,
    type: 'success',
    duration: 5000,
  })
*/
type MessageType = 'success' | 'info' | 'error' | 'warning'
type ShortType = 's' | 'i' | 'e' | 'w'
type ToastType = MessageType | ShortType
type ToastOptions = Partial<MessageOptions> & { closeAll?: boolean }

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

// Add shorthand methods for each type of message
$toast.success = (message, otherParams = {}) => $toast(message, 'success', otherParams)
$toast.info = (message, otherParams = {}) => $toast(message, 'info', otherParams)
$toast.error = (message, otherParams = {}) => $toast(message, 'error', otherParams)
$toast.warning = (message, otherParams = {}) => $toast(message, 'warning', otherParams)

export function setStorage(storageName: string, params: any, isSession = false) {
  let handleParams
  if (typeof params === 'number' || typeof params === 'string') {
    handleParams = params
  } else {
    handleParams = JSON.stringify(params)
  }
  if (isSession) {
    sessionStorage.setItem(storageName, handleParams)
  } else {
    localStorage.setItem(storageName, handleParams)
  }
}

export function getStorage(data, isSession = false) {
  // 先获取localStorage数据, 如果没有再获取sessionStorage数据。 如果都没有， null;
  let getLocalData = ''
  let getSessionData = ''
  // 如果isSessionFirst为true, 先判断sessionStorage, 后判断localStorage
  if (isSession) {
    getSessionData = sessionStorage.getItem(data)
  } else {
    getLocalData = localStorage.getItem(data)
  }
  if (getLocalData) {
    try {
      if (typeof JSON.parse(getLocalData) !== 'number') {
        getLocalData = JSON.parse(getLocalData)
      }
    } catch (e) {}
    return getLocalData
  } else if (getSessionData) {
    try {
      if (typeof JSON.parse(getSessionData) !== 'number') {
        getSessionData = JSON.parse(getSessionData)
      }
    } catch (e) {}
    return getSessionData
  }
  return null
}

/**
 *
 * @param {*} str 需要清空的localStorage或sessionStorage, 如果不传清空所有
 * @param {*} param1 需要排除的sessionStorage或者localStorage
 * @example
 * clearStorage()
 * clearStorage('loginId')
 * clearStorage(['loginId', 'token'])
 * clearStorage({ exclude: ['loginId', 'token'] })
 */
export function clearStorage(str: string | [] | object = '') {
  if (isEmpty(str)) {
    sessionStorage.clear()
    localStorage.clear()
  }
  if (notEmpty(str) && getType(str) !== 'object') {
    let strArr = Array.isArray(str) ? str : [str]
    for (let i = 0; i < strArr.length; i++) {
      sessionStorage.removeItem(strArr[i])
      localStorage.removeItem(strArr[i])
    }
  }
  if (_isObjectWithExclude(str)) {
    if (notEmpty(str.exclude) && getType(str) === 'object') {
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
      sessionStorage.clear()
      localStorage.clear()
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
function _isObjectWithExclude(obj: object | string | []): obj is { exclude: { [key: string]: string } } {
  return typeof obj === 'object' && obj !== null && 'exclude' in obj && typeof obj.exclude === 'object'
}

/**
 * element-plus的form表单使用promise进行封装
 * @param ref
 * @param param1
 * @returns Promise
 * await proxy.validForm(formRef);
 * await proxy.validForm(formRef, {message: '自定义错误'});
 * await proxy.validForm(formRef, {showMessage: false});
 * await proxy.validForm(formRef, {detail: true});
 */

export function validForm(ref, { message = '表单校验错误, 请检查', detail = false, showMessage = true } = {}) {
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

/**
 * 判断变量是否空值
 * undefined, null, '', '   ', false, 0, [], {}, NaN, new Set(), new Map(), BigInt(0), new Date('无效日期') 均返回true，否则返回false
 */
export function isEmpty(data: any, strict = false): boolean {
  if (isRef(data)) {
    data = unref(data)
  }

  // 处理严格模式（strict=true 时，0/false 不算空）
  if (strict) {
    if (data === false || data === 0 || data === BigInt(0)) {
      return false
    }
  }

  // 处理 null/undefined
  if (data == null) return true
  // 如果是日期对象，检查它是否是有效的日期
  if (data instanceof Date) {
    return isNaN(data.getTime())
  }
  // 处理基础类型
  switch (typeof data) {
    case 'string':
      return data.trim().length === 0
    case 'boolean':
      return !data
    case 'number':
      return 0 === data || isNaN(data) // ❗ `NaN`或者0 被认为是空
    case 'symbol':
      return false
    case 'bigint':
      return data === BigInt(0)
  }
  // 处理集合类型
  if (data instanceof Map || data instanceof Set) return data.size === 0
  // 处理数组/类数组
  if (
    Array.isArray(data) ||
    (typeof data.length === 'number' && Object.prototype.toString.call(data) === '[object Object]')
  ) {
    return data.length === 0
  }

  // 处理普通对象
  if (typeof data === 'object') {
    return Object.keys(data).length === 0
  }

  return false
}
// 非空
export function notEmpty(v: any): boolean {
  return !isEmpty(v)
}

/**
 *  将两个对象合并, 以第二个对象为准, 如果两个对象, 一个属性有值, 一个没值, 合并后有值; 如果两个属性都有值, 以第二个属性为准
 *  */
export function merge(obj1: object, obj2: object): object {
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
  return merged
}

/**
 * 克隆数据并根据需要复制数组
 * @param {any} data - 要克隆的数据
 * @param {number} [times=1] - 如果是数组，要复制的次数
 * @returns {any} - 克隆后的数据或复制后的数组
 * clone(123) => 123
 * clone([1,2, {name: 'andy'}], 2) => [1, 2, {name: 'andy'}, 1, 2, {name: 'andy'}]
 */
export function clone(data, times = 1) {
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
 * 生成 UUID
 * @param type - 生成 UUID 的类型，可以是 'phone', 'email', 'time', 'number', 'ip', 'port' 或空字符串
 * @param length - 生成字符串的长度（默认为4）
 * @param options - 额外的选项
 * @param options.emailStr - 生成 email 时使用的后缀（默认为 '@qq.com'）
 * @param options.timeStr - 生成时间字符串的格式（默认为 '{y}-{m}-{d} {h}:{i}:{s}'）
 * @param options.startStr - 起始字符串（默认为空）
 * @param options.optionsIndex - 数组索引（默认为随机）
 * @returns 生成的 UUID (字符串或数字)
 * * uuid("名字") => 名字hc8f
 * uuid() => abcd
 * uuid('time') => 25MR 10-27 17:34:01
 * uuid('time', 0, {startStr:'andy', timeStr:"{h}:{i}:{s}"}) => andy 17:38:23
 * uuid('phone') => 13603312460
 * uuid('email') => cBZA@qq.com
 * uuid('number') => 2319
 * uuid([ { label: "小泽泽", value: "xzz" },{ label: "小月月", value: "xyy" }]) => xzz
 */
export function uuid(
  type: string | Array<{ label: string; value: any }> = '',
  length = 4,
  options: {
    emailStr?: string
    timeStr?: string
    startStr?: string
    optionsIndex?: number | null
  } = {},
): string | number {
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
 * 判断传入参数的类型
 * @param {*} type
 * getType(new RegExp()) regexp
 * getType(new Date()) date
 * getType([]) array
 * getType({}) object
 * getType(null) null
 * getType(123) number
 */
export function getType(type) {
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

export function validateTrigger(type = 'required', rules = {}, pureValid = false) {
  let mergeRules = {
    trigger: ['blur', 'change'],
    ...rules,
  }
  return validate(type, mergeRules, pureValid)
}

/**
 * 表单验证函数，用于生成 Element UI 表单验证规则
 *
 * @example
 * 1. 在el-form中使用
 * name: [ proxy.validate('name', { message: '你干嘛哈哈' })],
 * between: [ proxy.validate('between', { min: 1, max: 99 })],
 * number: [ proxy.validate('number')],
 * length: [proxy.validate('length', {min: 1, max: 2})],
 * mobile: [ proxy.validate('mobile')],
 * port: [ proxy.validate('port')],
 * ip: [ proxy.validate('ip')],
 * custom: [proxy.validate('custom', { message: '最多保留2位小数', reg: /^\d+\.?\d{0,2}$/ })]
 * confirmRegPwd: [
 *   proxy.validate('same', { value: form.value.regPwd }),
 * ], //1. 如果判断两个密码一致, 还要在input输入值改变的时候, 再校验一下两个input
 *   formRef.value.validate('regPwd')
 *   formRef.value.validate('confirmRegPwd')
 *   // 2. rules需要使用computed包裹, 否则值改变无法传递
 *
 * @example
 * 2. 在函数中使用, 返回boolean
 * let ip = proxy.validate('ip', 122322, true)
 * let custom = proxy.validate('custom', { value: -123, reg: /^-\d+\.?\d{0,2}$/ }, true)
 *
 * @param type 验证类型，可以是 'required', 'password', 'number', 'positive', 'zeroPositive', 'integer', 'decimal', 'mobile', 'email', 'ip', 'port', 'between', 'length', 'same', 'custom' 中的一种，如果不属于这些类型，则会作为错误信息显示
 * @param rules 验证规则配置对象，可包含 message, max, min, value, reg, required 等属性
 * @param pureValid 是否直接返回验证结果的布尔值，默认为 false
 * @returns 如果 pureValid 为 true，返回验证结果的布尔值；否则返回 Element UI 表单验证规则对象
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

export function validate(type: string = 'required', rules: Record<string, any> = {}, pureValid: boolean = false) {
  let trigger = rules.trigger || []
  // 使用枚举值组成的联合类型来确保类型安全
  const typeMaps = Object.values(ValidateType) as string[]
  let parseRequired = rules.required ?? true

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
      message: rules.message ?? '请输入',
      trigger: trigger,
    }
  }

  // validator: this.validateName,
  if (type === ValidateType.PASSWORD) {
    const validateName = (rule: any, value: any, callback: (error?: Error) => void) => {
      let validFlag = /^[a-zA-Z0-9_-]+$/.test(value)
      if (!validFlag) {
        callback(new Error(rules.message || '密码只能由英文、数字、下划线、中划线组成'))
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
    let min = rules.min
    let max = rules.max
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
      min: rules.min,
      max: rules.max,
      message: rules.message ?? `请输入${rules.min}到${rules.max}个字符`,
      trigger: trigger,
      required: parseRequired,
    }
  }

  if (type === ValidateType.SAME) {
    const validateSame = (rule: any, value: any, callback: (error?: Error) => void) => {
      let isSame = value === rules.value
      if (!isSame) {
        const errMessage = rules.message || '密码和确认密码要一致'
        callback(new Error(errMessage))
      }
      if (parseRequired && !value) {
        callback(new Error(rules.message || '请输入'))
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
      return _validValue(rules.value, rules.message, pureValid, rules.reg)
    } else {
      return _validValue(rules, rules.message, pureValid, rules.reg)
    }
  }

  function _validValue(rules: any, msg: string, pureValid: boolean, reg: RegExp) {
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
 * 
const { res, err } = await proxy.asyncWrapper(listTests, pickForm);
if (err) {
	return;
}
 */
export async function asyncWrapper(func, ...args) {
  try {
    const res = await func(...args)
    return { res }
  } catch (err) {
    return { err }
  }
}

type ToastParams =
  | { hideToast?: boolean } // 只有 hideToast
  | (Omit<ToastOptions, 'hideToast'> & { hideToast: boolean }) // 两者都有，确保hideToast被包含

/**
 * 复制文本
 *
 * copy('这是要复制的文本');
 *
 * copy('这是要复制的文本', {duration: 500});
 *
 * copy('这是要复制的文本', {hideToast: true});
 *
 *  */
export const copy = (text, toastParams: ToastParams = {}) => {
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

/*
*
* @example
const str = ref(11)
proxy.log(`variableStr`, variableStr, "/cyrd/oeos-components/packages/utils/index.ts");
 */
export function log(variableStr, variable, otherInfo = '') {
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
 * 生成指定范围内的随机整数
 *
 * @param min 最小值，默认为0
 * @param max 最大值，默认为10
 * @returns 返回生成的随机整数
 */
export function random(min = 0, max = 10) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 将文本转换为带有连接符的行文本
 *
 * @param text 要转换的文本
 * @param connect 连接符，默认为'-'
 * @returns 返回转换后的行文本
 * toLine('NameAndy') // name-andy
 * toLine('nameAndy') // name-andy
 * toLine('_nameAndy') // _name-andy
 */
export function toLine(text, connect = '-') {
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

// processWidth(200) // { width: '200px' }
// processWidth('200', true) // 200px
// processWidth('200.33px') // { width: '200.33px' }
// processWidth('') // {}
export function processWidth(initValue, isBase = false) {
  let value = unref(initValue)
  let res = ''
  if (!value) {
    return isBase ? value : {}
  } else if (typeof value === 'number') {
    value = String(value)
  }
  if (value === '') {
    return isBase ? value : {}
  } else if (typeof value === 'string' && !isNaN(value)) {
    res = value + 'px'
  } else if (typeof value === 'string' && /^[0-9]+(\.[0-9]+)?(px|%|em|rem|vw|vh|ch)*$/.test(value)) {
    res = value
  } else {
    console.warn(`${value} is Invalid unit provided`)
    return value
  }
  if (isBase) {
    return res
  }
  return { width: res }
}

export function throttle(fn, delay = 1000) {
  // last为上一次触发毁掉的时间，timer是定时器
  let last = 0
  let timer = null
  // 将throttle处理结果当做函数返回
  return function () {
    // 保留调用时的this上下文
    let context = this
    // 保留调用时传入的参数
    let args = arguments
    // 记录本次触发回调的时间
    let now = +new Date()
    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last < delay) {
      // 如果时间间隔小于设定的时间间隔阈值,则为本次触发操作设立一个新的定时器
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        fn.apply(context, args)
      }, delay)
    } else {
      // 如果时间间隔超出了设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
      last = now
      fn.apply(context, args)
    }
  }
}

/**
 * 封装 Promise 执行，提供自动 loading 状态管理
 * @param promise 需要执行的 Promise
 * @param sendLoading 可选的 loading 状态(支持 Ref<boolean> 或 boolean)
 * @returns Promise<{ data: T | null; error: any }>
 * @example1
 * const loading = ref(false);
 * const { data, error } = await tryCatch(fetchUserData(), loading);
 * @example2 // 无视 loading 状态
 * const { data, error } = await tryCatch(fetchUserData());
 */
export function tryCatch<T>(
  promise: Promise<T>,
  sendLoading?: Ref<boolean> | null,
): Promise<{ data: T | null; error: any }> {
  const updateLoading = (value: boolean): void => {
    if (isRef(sendLoading)) {
      sendLoading.value = value
    } else if (sendLoading !== null) {
      console.warn('Cannot modify non-ref sendLoading directly!')
    }
  }

  // 初始化 loading 状态
  updateLoading(true)

  return promise
    .then((data: T) => {
      updateLoading(false)
      return { data, error: null }
    })
    .catch((error: any) => {
      updateLoading(false)
      return { data: null, error }
    })
}

/**
 * 防抖函数
 * @param { Function } func 函数
 * @param { Number } delay 防抖时间
 * @param { Boolean } immediate 是否立即执行
 * @param { Function } resultCallback
 */
export function debounce(func: Func, delay: number = 500, immediate?: boolean, resultCallback?: Func) {
  let timer: null | ReturnType<typeof setTimeout> = null
  let isInvoke = false
  const _debounce = function (this: unknown, ...args: any[]) {
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
  }
  _debounce.cancel = function () {
    if (timer) clearTimeout(timer)
    isInvoke = false
    timer = null
  }
  return _debounce
}

/**
 * proxy.confirm('确定删除吗?')
 * proxy.confirm('哈哈', { icon: 'el-icon-plus' })
 * close-on-click-modal: 是否可通过点击遮罩层关闭 MessageBox 默认true
 * lock-scroll: 是否在 MessageBox 出现时将 body 滚动锁定. 默认true
 * 设置宽度, 内容使用组件
   import GWarning from '@/autoComponents/gWarning.vue'
    await proxy.confirm('', {
      dangerouslyUseHTMLString: true,
      customStyle: {
        maxWidth: '600px',
      },
      message: h(GWarning, {
        content:
          '对于光存储开启保持原始对象名称后，对象将作为独立文件在光存储介质直接存储。<br>注意：当桶内文件大小普遍较小（<100MB）或过大（>5GB）时不推荐打开此功能！您确定开启此功能吗?',
      }),
      showCancelButton: true,
      cancelButtonText: '取消',
      appendTo: '#highSettingsForm',
    })
 * 如果是多个dialog嵌套, 可以给上层的dom设置个id如highSettingsForm, 然后appendTo: '#highSettingsForm'
 */
export function confirm(message, options) {
  const resolvedMessage = typeof message === 'function' ? message() : message
  // 关键点：直接访问 Element Plus 内部维护的全局上下文
  const elContext =
    ElMessageBox.install?.context || ElMessageBox._context || document.querySelector('#app')?._vue_app?._context
  const mergeOptions = {
    title: '提示',
    draggable: true,
    showCancelButton: false,
    confirmButtonText: '确定',
    dangerouslyUseHTMLString: true, // 允许 HTML
    appContext: elContext, // 强制注入 Element Plus 的上下文
    ...options,
  }
  return ElMessageBox.confirm(resolvedMessage, mergeOptions)
}

/** Function to get a CSS custom property value
 *
 * getVariable('--blue');
 *  */
export function getVariable(propertyName) {
  let res = getComputedStyle(document.documentElement).getPropertyValue(propertyName).trim()
  return res
}

export function test() {
  return '哈哈哈' + new Date()
}
