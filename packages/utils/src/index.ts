import { unref, isRef, toRaw } from '@vue/reactivity'
import type { Ref } from '@vue/reactivity'
import { cloneDeep } from 'lodash-es'
import { consola } from 'consola'
import { ElMessage, ElMessageBox, ElMessageOptions } from 'element-plus'
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
 * formatTime(time, cFormat = '{y}-{m}-{d} {h}:{i}:{s}')
 * formatDurationTime(timestamp, cFormat = '{d} 天 {h} 时 {i} 分 {s} 秒')
 * uuid(type = '',length = 4,{ emailStr = '@qq.com', timeStr = '{m}-{d} {h}:{i}:{s}', startStr = '', optionsIndex = null } = {},)
 * getType(type)
 * sleep(delay = 0, fn?: () => void)
 * validate(type = 'required', rules = {}, pureValid = false)
 * asyncWrapper(func, ...args)
 * formatImg(photoName, addPath = '', { basePath = 'assets/images' } = {})
 * copy = (text, toastParams = {})
 * formatThousands(number)
 * log(variableStr, variable, otherInfo = '')
 * random(min = 0, max = 10)
 * toLine(text, connect = '-')
 * processWidth(initValue, isBase = false)
 * formatBytes(bytes)
 * formatBytesConvert(bytes)
 * throttle(fn, delay = 1000)
 * debounce(fn, delay = 1000)
 * confirm(message, options)
 * formatNewLines(str)
 * getVariable('--green')
 */
export const isString = (val: any): val is string => typeof val === 'string'
export const isStringNumber = (val: string): boolean => {
  if (!isString(val)) {
    return false
  }
  return !Number.isNaN(Number(val))
}

export const isNumber = (val: any): val is number => typeof val === 'number'

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
type ToastOptions = Partial<ElMessageOptions> & { closeAll?: boolean }

export function $toast(
  message: string | ToastOptions,
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
    ElMessage(message)
    return
  }

  // Case 2: type is options object
  if (isToastOptions(type)) {
    if (type.closeAll) {
      ElMessage.closeAll()
    }
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
 * 格式化时间为年月日时分秒的格式， 格式可以自定义。
 * ① 时间戳10位和13位都可以转换成格式化的日期
 * ② java8格式的日期和有效的日期都可以转换成定义的日期格式
 * @param {Date, string}  都有默认参数
 * @example
 * formatTime() // 2020-07-17 09:53:07
 * formatTime('2018-02-13T06:17') // 2018-02-13 06:17:00
 * formatTime('2020/03/02 06:02') // 2020-03-02 06:02:00
 * formatTime(1541927611000); //2018-11-11 17:13:21
 * formatTime(1541927611000, "{y}年{m}月{d}日 {h}时{m}分{s}秒"); // 2018年11月11日 17时11分31秒
 * formatTime(1541927611, "{y}/{m}/{d} {h}:{m}:{s}"); // 2018/11/11 17:11:31
 * formatTime(new Date()); //2018-11-11 17:13:21
 * formatTime(new Date().getTime()); //2018-11-11 17:13:21
 */
export function formatTime(time, cFormat = '{y}-{m}-{d} {h}:{i}:{s}') {
  if (!time) {
    return time
  }
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
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
  const time_str = cFormat.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key] // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 *
 * @param timestamp 持续的时间戳
 * @param cFormat 格式化的规则
 * @returns 天时分秒的字符串
 * @example
 * formatDurationTime(1162821) => 19分24秒
 */
export function formatDurationTime(timestamp, cFormat = '{d}天{h}时{i}分{s}秒') {
  const secondsPerMinute = 60
  const minutesPerHour = 60
  const hoursPerDay = 24
  let totalSeconds = Math.floor(timestamp / 1000)
  let days = 0
  // 只有返回天了, 才计算时间有多少天
  if (cFormat.indexOf('d') !== -1) {
    days = Math.floor(totalSeconds / (secondsPerMinute * minutesPerHour * hoursPerDay))
    totalSeconds %= secondsPerMinute * minutesPerHour * hoursPerDay
  }
  // 计算总秒数
  let hours = Math.floor(totalSeconds / (secondsPerMinute * minutesPerHour))
  totalSeconds %= secondsPerMinute * minutesPerHour
  let minutes = Math.floor(totalSeconds / secondsPerMinute)
  let seconds = totalSeconds % secondsPerMinute
  const formatObj = {
    d: days,
    h: hours,
    i: minutes,
    s: seconds,
  }
  let parseFormat = cFormat
  if (days === 0) {
    parseFormat = cFormat.match(/{h}.*/g)[0]
    if (hours === 0) {
      parseFormat = cFormat.match(/{i}.*/g)[0]
      if (minutes === 0) {
        parseFormat = cFormat.match(/{s}.*/g)[0]
      }
    }
  }
  const time_str = parseFormat.replace(/{(y|m|d|h|i|s)+}/g, (result, key) => {
    let value = formatObj[key] // Note: getDay() returns 0 on Sunday
    if (result.length > 0 && value < 10 && value != 0) {
      value = '0' + value
    }
    return value || '00'
  })
  return time_str
}

/**
 * 生成 UUID
 * @param {string} [type=''] - 生成 UUID 的类型，可以是 'phone', 'email', 'time', 'number' 或空字符串
 * @param {number} [length=4] - 生成字符串的长度
 * @param {object} [options={}] - 额外的选项
 * @param {string} [options.emailStr='@qq.com'] - 生成 email 时使用的后缀
 * @param {string} [options.timeStr='{m}-{d} {h}:{i}:{s}'] - 生成时间字符串的格式
 * @param {string} [options.startStr=''] - 起始字符串
 * @param {number|null} [options.optionsIndex=null] - 数组索引
 * @returns {string|number} - 生成的 UUID
 * uuid("名字") => 名字hc8f
 * uuid() => abcd
 * uuid('time') => 25MR 10-27 17:34:01
 * uuid('time', 0, {startStr:'andy', timeStr:"{h}:{i}:{s}"}) => andy 17:38:23
 * uuid('phone') => 13603312460
 * uuid('email') => cBZA@qq.com
 * uuid('number') => 2319
 * uuid([ { label: "小泽泽", value: "xzz" },{ label: "小月月", value: "xyy" }]) => xzz
 */

export function uuid(
  type = '',
  length = 4,
  { emailStr = '@qq.com', timeStr = '{m}-{d} {h}:{i}:{s}', startStr = '', optionsIndex = null } = {},
) {
  let randomStr = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  let res = type
  if (isRef(type)) {
    type = unref(type)
  }
  // 如果传的第一个参数的数组， 说明是下拉框。 下拉框获取的是数组的第一项的值
  if (getType(type) === 'array' && type.length > 0) {
    let randNum = random(0, type.length - 1)
    // 如果length传空, 说明数组里是基本数据类型, 那直接返回数组里的值
    if (!length) {
      return type[optionsIndex ?? randNum]
    }
    // 否则返回数组里对象里的值
    return type[optionsIndex ?? randNum][length === 4 ? 'value' : length]
  }
  // 如果是手机号, 生成随机手机号
  if (type === 'phone') {
    let prefixArray = new Array('130', '131', '132', '133', '135', '136', '137', '138', '170', '187', '189')
    let i = parseInt(Math.random() * 10)
    let res = prefixArray[i]
    for (var j = 0; j < 8; j++) {
      res += Math.floor(Math.random() * 10)
    }
    return res
  }
  // 如果是email, 生成随机email
  if (type === 'email') {
    return uuid(startStr, length) + emailStr
  }
  // 如果是时间, 生成时间字符串
  if (type === 'time') {
    return uuid(startStr, length) + ' ' + formatTime(new Date(), timeStr)
  }
  // 如果是数字, 生成除了0的随机数字
  if (type === 'number') {
    let randomStr = '123456789'
    let res = ''
    for (let i = length; i > 0; --i) {
      res += randomStr[Math.floor(Math.random() * randomStr.length)]
    }
    return Number(res)
  }
  if (type === 'ip') {
    let randomNum = random(1, 99)
    return `10.0.11.` + randomNum
  }
  if (type === 'port') {
    let randomNum = random(1, 65535)
    return randomNum
  }
  // 生成随机字符串
  for (let i = length; i > 0; --i) {
    res += randomStr[Math.floor(Math.random() * randomStr.length)]
  }
  return res
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

export function sleep(delay = 0, fn?: () => void) {
  return new Promise((resolve) =>
    setTimeout(() => {
      fn?.()
      resolve()
    }, delay),
  )
}

/** @使用方式 
 * 1. 在el-form中使用
name: [ proxy.validate('name', { message: '你干嘛哈哈' })],
between: [ proxy.validate('between', { max: 99 })],
number: [ proxy.validate('number')],
length: [proxy.validate('length')],
mobile: [ proxy.validate('mobile')],
ip: [ proxy.validate('ip')],
custom: [proxy.validate('custom', { message: '最多保留2位小数', reg: /^\d+\.?\d{0,2}$/ })]
confirmRegPwd: [
  proxy.validate('same', { value: form.value.regPwd }),
], //1. 如果判断两个密码一致, 还要在input输入值改变的时候, 再校验一下两个input
  formRef.value.validate('regPwd')
  formRef.value.validate('confirmRegPwd')
  // 2. rules需要使用computed包裹, 否则值改变无法传递
 * 2. 在函数中使用, 返回boolean
 let ip = proxy.validate('ip', 122322, true)
 let custom = proxy.validate('custom', { value: -123, reg: /^-\d+\.?\d{0,2}$/ }, true)
*/
export function validate(type = 'required', rules = {}, pureValid = false) {
  // 如果第一个参数是对象, 则相当于重载
  if (getType(type) === 'object') {
    pureValid = rules || false
    rules = type
    type = 'required'
  }
  // let trigger = rules.trigger || ['blur', 'change']
  let trigger = rules.trigger || []
  const typeMaps = ['required', 'pwd', 'number', 'mobile', 'between', 'length', 'same', 'ip', 'port', 'custom']
  let parseRequired = rules.required ?? true

  // 如果不包含typeMaps中的类型, 直接将第一个参数作为message
  if (!typeMaps.includes(type)) {
    return {
      required: parseRequired,
      message: type,
      trigger: trigger,
    }
  }
  if (type === 'required') {
    return {
      required: parseRequired,
      message: rules.message ?? '请输入',
      trigger: trigger,
    }
  }

  // validator: this.validateName,
  if (type === 'password') {
    const validateName = (rule, value, callback) => {
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
  if (type === 'positive' || type === 'number') {
    // 正整数
    return _validValue(rules, '请输入正整数', pureValid, /^[1-9]+\d*$/)
  }
  if (type === 'zeroPositive') {
    // 正整数且包含0
    return _validValue(rules, '请输入非负整数', pureValid, /^(0|[1-9]+\d*)$/)
  }
  // 整数, 包含负数和0
  if (type === 'integer') {
    return _validValue(rules, '请输入整数', pureValid, /^(0|[-]?[1-9]\d*)$/)
  }
  // 非负数, 整数和最多2位小数
  if (type === 'decimal') {
    return _validValue(rules, '请输入非负数字, 包含小数且最多2位', pureValid, /(0|[1-9]\d*)(\.\d{1, 2})?|0\.\d{1,2}/)
  }
  if (type === 'mobile') {
    return _validValue(rules, '请输入正确的手机号', pureValid, /^[1][0-9]{10}$/)
  }
  if (type === 'ip') {
    return _validValue(
      rules,
      '请输入正确的ip地址',
      pureValid,
      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    )
  }
  if (type === 'between') {
    let min = rules.min || 1
    let max = rules.max || 10
    const validateBetween = (rule, value, callback) => {
      let validFlag = /^[0-9]+$/.test(value)
      if (!validFlag) {
        callback(new Error('请输入数字'))
      }
      if (value < min) {
        callback(new Error(`数字不能小于${min}`))
      }
      if (value > max) {
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
  if (type === 'length') {
    return {
      min: rules.min,
      max: rules.max,
      message: rules.message ?? `请输入${rules.min}到${rules.max}个字符`,
      trigger: trigger,
      required: parseRequired,
    }
  }
  if (type === 'port') {
    return _validValue(
      rules,
      '请输入1-65535的端口号',
      pureValid,
      /^([1-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-5][0-5][0-3][0-5])$/,
    )
  }

  if (type === 'same') {
    const validateSame = (rule, value, callback) => {
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
  if (type === 'custom') {
    //  _validValue(rules, '请输入正确的手机号', pureValid, /^[1][0-9]{10}$/)
    if (pureValid) {
      return _validValue(rules.value, rules.message, pureValid, rules.reg)
    } else {
      return _validValue(rules, rules.message, pureValid, rules.reg)
    }
  }

  function _validValue(rules, msg, pureValid, reg) {
    if (pureValid === true) {
      return reg.test(rules)
    }
    const validatePhone = (rule, value, callback) => {
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

/** 获取assets静态资源
 * @example
 *  proxy.formatImg('1.png')
 *  proxy.formatImg('1.png', 'menu')
 *  */
export function formatImg(photoName, addPath = '', { basePath = 'assets/images' } = {}) {
  if (photoName.startsWith('http') || photoName.startsWith('https')) {
    return photoName
  }
  if (photoName.indexOf('.') === -1) {
    photoName = photoName + '.png'
  }
  const addLastSlash = addPath.endsWith('/') || !addPath ? addPath : `${addPath}/`
  const addLastBasePathSlash = basePath.endsWith('/') || !basePath ? basePath : `${basePath}/`
  let mergeSrc = `${addLastSlash}${photoName}`
  // '../assets/images/1.png'
  let res = new URL(`../${addLastBasePathSlash}${mergeSrc}`, import.meta.url).href
  return res
}

/**
 * 复制文本
 *
 * copy('这是要复制的文本');
 * copy('这是要复制的文本', {duration: 500});
 *
 *  */
export const copy = (text, toastParams = {}) => {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
  if (!toastParams.hideToast) {
    $toast(text + '复制成功', toastParams)
  }
}

/**
 * 1234 => 1,234
 * 1234b => 1,234b
 * 1234.12b => 1,234.12b
 * @param number 加千分位
 * @returns
 */
export function formatThousands(number) {
  // 提取数字部分、小数点和小数部分
  let matches = ('' + number).match(/^([\d,]+)(\.?)(\d+)?(\D+)?$/)
  if (!matches) {
    return number // 如果没有找到匹配，则返回原始输入
  }

  let numericString = matches[1].replace(/\D/g, '') // 仅保留数字
  let decimalString = matches[3] ? `.${matches[3]}` : '' // 小数部分，如果没有则为空字符串
  let unit = matches[4] || '' // 单位部分，如果没有则为空字符串

  // 添加千位分隔符
  let numberWithSeparator = numericString.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // 拼接数字、小数点、小数部分和单位，并返回结果
  return `${numberWithSeparator}${decimalString}${unit}`
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

/**
 * 增加小数点
 * toFixed(22) -> '22.00'
 * toFixed('22') -> '22.00'
 * toFixed('22', 4) -> '22.0000'
 * toFixed('22', 2) -> 22
 * toFixed('22 TB', {prefix: '$', suffix: '%', unit: false}) -> $22.00%
 */
export function toFixed(
  value: any,
  options: { digit?: number; prefix?: string; suffix?: string; unit?: boolean } | number = {},
) {
  // 如果第二个参数是数字，则将其视为 digit
  if (typeof options === 'number') {
    options = { digit: options }
  }

  // 默认为 digit=2, prefix='', suffix=''
  let { digit = 2, prefix = '', suffix = '', unit = true } = options
  // 提取数字部分、小数点和小数部分
  let matches = ('' + value).match(/^([\d,]+)(\.?)(\d+)?(\D+)?$/)
  if (!matches) {
    return value // 如果没有找到匹配，则返回原始输入
  }

  let numericString = matches[1].replace(/\D/g, '') // 仅保留数字
  let decimalString = matches[3] ? `.${matches[3]}` : '' // 小数部分，如果没有则为空字符串
  let finalUnit = matches[4] || '' // 单位部分，如果没有则为空字符串

  let res = numericString
  if (isStringNumber(numericString) || isNumber(numericString)) {
    res = Number(numericString + decimalString).toFixed(digit)
  }
  if (!unit) {
    finalUnit = ''
  }
  return `${prefix}${res}${finalUnit}${suffix}`
}

/**
 * 只有对正整数或者字符串正整数才进行单位的转换,
 * 否则返回原始数据
 * @example
 * proxy.formatBytes(536870912) // 512MB
 * proxy.formatBytes(536870912) // 512MB
 */
export function formatBytes(
  bytes,
  options: { digit?: number; thousands?: boolean; prefix?: string; suffix?: string } | number = {},
) {
  let { digit = 2, thousands = true, prefix = '', suffix = '' } = options
  if (isStringNumber(bytes) || isNumber(bytes)) {
    bytes = Number(bytes)
  } else {
    return bytes
  }
  if (bytes <= 0) {
    return bytes.toFixed(digit) + ' B'
  }

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  let res = (bytes / Math.pow(k, i)).toFixed(digit) + ' ' + sizes[i]
  if (thousands) {
    res = formatThousands(res)
  }
  return `${prefix}${res}${suffix}`
}

/**
 * 字节转数字
 * @param oBytes
 * @param param1
 * @returns number
 * formatBytesConvert('0.5GB') 536870912
 * formatBytesConvert('1,234 GB') 1324997410816
 * formatBytesConvert('1,234 GB', {thousand: true}) 1,324,997,410,816
 * formatBytesConvert('1,234 GB', {toFixed: 2}) 1324997410816.00
 */
export function formatBytesConvert(oBytes, { thounsand = false, toFixed = 0 } = {}) {
  if (isStringNumber(oBytes) || isNumber(oBytes) || getType(oBytes) !== 'string') {
    return oBytes
  }
  if (!oBytes) {
    return oBytes
  }

  // 如果有千分位, 先将千分位的,去掉
  const regex = /^\d{1,3}(,\d{3})*(\.\d+)?[a-zA-Z ]*$/
  let bytes = oBytes
  if (regex.test(oBytes)) {
    bytes = oBytes.replace(/,/g, '')
    if (isStringNumber(bytes) || isNumber(bytes) || getType(bytes) !== 'string') {
      return bytes
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

  const match = bytes.match(bytesRegex)
  if (!match) {
    console.warn("Invalid bytes format. Please provide a valid bytes string, like '100GB'.")
    return
  }

  const size = parseFloat(match[1])
  const unit = match[2].toUpperCase()

  if (!units.hasOwnProperty(unit)) {
    console.warn(
      "Invalid bytes unit. Please provide a valid unit, like 'B', 'BYTE', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', or 'YB'.",
    )
    return
  }
  let finalRes = size * units[unit]
  if (toFixed) {
    finalRes = Number(finalRes).toFixed(toFixed)
  }
  if (thounsand) {
    finalRes = formatThousands(finalRes)
  }

  return finalRes
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

export function debounce(fn, delay = 1000) {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
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

/**
 * 格式化字符串中的换行符和制表符
 * @param str 待格式化的字符串
 * @returns 格式化后的字符串，如果输入的不是字符串或为空，则返回原字符串
 * @example
$toast(
  formatNewLines(
    'Example file\n  File : 111.jpeg\n  CreateTime : 1721011155921 2024-07-15 10:39:15\n  LastUpdateTime : 1721011155921 2024-07-15 10:39:15\n------------------------------------------------------------------------\nExtract:\n  aa=231\n------------------------------------------------------------------------\n',
  ),
  {
    duration: 5000,
    dangerouslyUseHTMLString: true,
  },
)
 */
export function formatNewLines(str) {
  // 如果 str 为空或者不是字符串类型，则直接返回 str
  if (!str || typeof str !== 'string') {
    return str
  }
  // 替换换行符 \n 为 <br> 标签
  str = str.replace(/\n/g, '<br>')
  // 替换制表符 \t 为四个空格或其他适当的字符
  str = str.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
  return str
}

/** Function to get a CSS custom property value
 *
 * getVariable('--blue');
 *  */
export function getVariable(propertyName) {
  let res = getComputedStyle(document.documentElement).getPropertyValue(propertyName).trim()
  return res
}
