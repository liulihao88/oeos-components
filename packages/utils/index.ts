import { unref, isRef, toRaw } from 'vue'
import { cloneDeep } from 'lodash-es'
import { isStringNumber, isNumber } from './types.js'
import { consola } from 'consola'

/**
 * @example
  proxy.$toast('保存成功')
  proxy.$toast('保存失败', 'e')
  proxy.$toast({
    message: 'andy',
    type: 'warning',
  })
* $toast.success('This is a success message')
*/
import { ElMessage, ElMessageBox } from 'element-plus'
export function $toast(message, type: string | object = 'success', otherParams: object = {}) {
  const map = {
    s: 'success',
    i: 'info',
    e: 'error',
    w: 'warning',
  }

  if (getType(message) === 'object') {
    if (message.clodeAll) {
      ElMessage.closeAll()
    }
    ElMessage(message)
    return
  }
  if (getType(type) === 'object') {
    if (type.clodeAll) {
      ElMessage.closeAll()
    }
    ElMessage({
      message: message,
      type: 'success',
      ...(type as object),
    })
    return
  }
  if (otherParams.closeAll) {
    ElMessage.closeAll()
  }
  ElMessage({
    message: message,
    type: map[type as string] || type,
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

// await proxy.validForm(formRef);
// await proxy.validForm(formRef, {showMessage: false})
export function validForm(ref, { message = '表单校验错误, 请检查', detail = true, showMessage = true } = {}) {
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
 * undefined, null, '', '   ', false, 0, [], {} 均返回true，否则返回false
 */
export function isEmpty(data: any): boolean {
  if (isRef(data)) {
    data = unref(data)
  }
  switch (typeof data) {
    case 'undefined':
      return true
    case 'string':
      if (data.trim().length === 0) return true
      break
    case 'boolean':
      if (!data) return true
      break
    case 'number':
      if (0 === data) return true
      break
    case 'object':
      if (null === data) return true
      if (undefined !== data.length && data.length === 0) return true
      for (var k in data) {
        return false
      }
      return true
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
  const result = []
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

export function sleep(delay = 0, fn) {
  return new Promise((resolve) =>
    setTimeout(() => {
      fn && fn()
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
phone: [ proxy.validate('phone')],
custom: [proxy.validate('custom', { message: '最多保留2位小数', reg: /^\d+\.?\d{0,2}$/ })]
confirmRegPwd: [
  proxy.validate('same', { value: toRef(form.value, 'regPwd') }),
],
 * 2. 在函数中使用, 返回boolean
 let ip = proxy.validate('ip', 122322, true)
 let custom = proxy.validate('custom', { value: -123, reg: /^-\d+\.?\d{0,2}$/ }, true)
*/

export function validate(type = 'required', rules = {}, pureValid = false) {
  let trigger = rules.trigger || ['blur', 'change']
  const typeMaps = ['required', 'pwd', 'number', 'mobile', 'between', 'same', 'length', 'ip', 'port', 'custom']
  // 如果不包含typeMaps中的类型, 直接将第一个参数作为message
  if (!typeMaps.includes(type)) {
    return {
      required: true,
      message: type,
      trigger: trigger,
    }
  }
  if (type === 'required') {
    return {
      required: true,
      message: rules.message ?? '请输入 ',
      trigger: trigger,
    }
  }

  // validator: this.validateName,
  if (type === 'pwd') {
    const validateName = (rule, value, callback) => {
      let validFlag = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value)
      if (!validFlag) {
        callback(new Error(rules.message || '密码需由中文、英文、数字、下划线组成，且不能以下划线开头和结尾'))
      } else {
        callback()
      }
    }
    return {
      validator: validateName,
      trigger: trigger,
    }
  }
  if (type === 'number') {
    return _validValue(rules, '请输入正整数', pureValid, /^[0-9]+$/)
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
  if (type === 'port') {
    return _validValue(
      rules,
      '请输入1-65535的端口号',
      pureValid,
      /^([1-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-5][0-5][0-3][0-5])$/,
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
    }
  }
  if (type === 'same') {
    const validateSame = (rule, value, callback) => {
      let isSame = value === rules.value.value
      if (!isSame) {
        const errMessage = rules.message || '密码和确认密码要一致'
        callback(new Error(errMessage))
      }
      callback()
    }
    return {
      validator: validateSame,
      trigger: trigger,
    }
  }
  if (type === 'custom') {
    //  _validValue(rules, '请输入正确的手机号', pureValid, /^[1][0-9]{10}$/)
    if (pureValid) {
      return _validValue(rules.value, rules.message, pureValid, rules.reg)
    } else {
      return _validValue(rules, rules.message, pureValid, rules.reg)
    }
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
    required: true,
    trigger: rules.trigger || ['blur', 'change'],
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

// 获取assets静态资源
// let src = proxy.globalImageUrl('1.png');
export function globalImageUrl(photoName) {
  if (photoName.startsWith('http')) {
    return photoName
  }
  if (photoName.indexOf('.') === -1) {
    photoName = photoName + '.png'
  }
  return new URL(`../assets/images/${photoName}`, import.meta.url).href
}

/**
 * 复制文本
 *
 * copy('这是要复制的文本');
 * copy('这是要复制的文本', {duration: 500});
 *
 *  */
export const copy = (text, ...toastParams) => {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
  if (!toastParams.hideToast) {
    $toast(text + '复制成功', ...toastParams)
  }
}

// 给数字加千分位
export function formatThousands(number) {
  // 提取数字部分和单位部分
  let matches = ('' + number).match(/^([\d,]+)(\D+)?$/)
  if (!matches) {
    return number // 如果没有找到匹配，则返回原始输入
  }

  let numericString = matches[1].replace(/\D/g, '') // 仅保留数字
  let unit = matches[2] || '' // 单位部分，如果没有则为空字符串

  // 添加千位分隔符
  let numberWithSeparator = numericString.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // 拼接数字和单位，并返回结果
  return numberWithSeparator + unit
}

/*
const str = ref(11)
proxy.log(`str`, str, "5行 test/t3.vue");
 */
export function log(variableStr, variable, otherInfo = '') {
  if (isRef(variable)) {
    let unrefVariable = unref(variable)
    _log(toRaw(unrefVariable))
  } else {
    _log(variable)
  }
  function _log(consoleData) {
    if (getType(consoleData) === 'object' || getType(consoleData) === 'array') {
      consola.log(
        `%c${variableStr} ${otherInfo}`,
        'background:#fff; color: blue;font-size: 1.2em',
        JSON.stringify(consoleData, null, '\t'),
      )
    } else {
      consola.log(`%c${variableStr} ${otherInfo}`, 'background:#fff; color: blue;font-size: 1.2em', consoleData)
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
 * 只有对正整数或者字符串正整数才进行单位的转换,
 * 否则返回原始数据
 *
 */
export function formatBytes(bytes) {
  if (isStringNumber(bytes) || isNumber(bytes)) {
    bytes = Number(bytes)
  } else {
    return bytes
  }
  if (bytes < 0 || !bytes) {
    return bytes
  }

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
export function formatBytesConvert(bytes) {
  if (isStringNumber(bytes) || isNumber(bytes)) {
    return bytes
  }
  if (!bytes) {
    return bytes
  }
  const bytesRegex = /^(\d+(?:\.\d+)?)\s*([BKMGTPEZY]?B)$/i
  const units = {
    B: 1,
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
      "Invalid bytes unit. Please provide a valid unit, like 'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', or 'YB'.",
    )
    return
  }

  return size * units[unit]
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
 * proxy.confirm('内容')
 * proxy.confirm('哈哈', { icon: 'el-icon-plus' })
 * close-on-click-modal: 是否可通过点击遮罩层关闭 MessageBox 默认true
 * lock-scroll: 是否在 MessageBox 出现时将 body 滚动锁定. 默认true
 */
export function confirm(message, options) {
  const baseOptions = {
    title: '提示',
    draggable: true,
    showCancelButton: false,
  }
  let mergeOptions = Object.assign({}, baseOptions, options)
  return new Promise((r, j) => {
    ElMessageBox.confirm(message, mergeOptions)
      .then(() => {
        r()
      })
      .catch(() => {
        j()
      })
  })
}
