import { ElMessage } from 'element-plus'
import { unref, isRef, toRaw } from 'vue'
import { cloneDeep } from 'lodash-es'

/**
 * proxy.$toast('保存成功')
 * proxy.$toast('保存失败', 'error')
 * 
proxy.$toast({
  message: 'andy',
  type: 'warning',
})
 */
export function $toast(message, type = 'success', otherParams = {}) {
  const map = {
    s: 'success',
    i: 'info',
    e: 'error',
    w: 'warning',
  }
  ElMessage.closeAll()
  if (judgeType(message) === 'object') {
    ElMessage(message)
    return
  }
  if (judgeType(type) === 'object') {
    ElMessage({
      message: message,
      type: 'success',
      ...type,
    })
    return
  }
  ElMessage({
    message: message,
    type: map[type] || type,
    ...otherParams,
  })
}

export function setStorage(str, params, isLocal = true) {
  let handleParams
  if (typeof params === 'number' || typeof params === 'string') {
    handleParams = params
  } else {
    handleParams = JSON.stringify(params)
  }
  if (isLocal) {
    localStorage.setItem(str, handleParams)
  } else {
    sessionStorage.setItem(str, handleParams)
  }
}

export function getStorage(data, isLocal = true) {
  // 先获取localStorage数据, 如果没有再获取sessionStorage数据。 如果都没有， null;
  let getLocalData = ''
  let getSessionData = ''
  // 如果isSessionFirst为true, 先判断sessionStorage, 后判断localStorage
  if (isLocal) {
    getLocalData = localStorage.getItem(data)
  } else {
    getSessionData = sessionStorage.getItem(data)
  }
  if (getLocalData) {
    try {
      if (typeof JSON.parse(getLocalData) !== 'number') {
        getLocalData = JSON.parse(getLocalData)
      }
    } catch (e) {
      // console.log('e', e);
    }
    return getLocalData
  } else if (getSessionData) {
    try {
      if (typeof JSON.parse(getSessionData) !== 'number') {
        getSessionData = JSON.parse(getSessionData)
      }
    } catch (e) {
      // console.log('e2', e);
    }
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
 * clearStorage('', {exceptSessions: ['loginId']});
 */
export function clearStorage(
  str = '',
  { exceptSessions = [], exceptLocals = [] } = {},
) {
  let sessionList = {}
  let localList = {}
  if (exceptSessions.length > 0) {
    exceptSessions.forEach((v) => {
      sessionList[v] = getStorage(v, true)
    })
  }
  if (exceptLocals.length > 0) {
    exceptLocals.forEach((v) => {
      localList[v] = getStorage(v)
    })
  }
  if (!str) {
    sessionStorage.clear()
    localStorage.clear()
  } else {
    sessionStorage.removeItem(str)
    localStorage.removeItem(str)
  }
  for (const key in sessionList) {
    const value = sessionList[key]
    setStorage(key, value)
  }
  for (const key in localList) {
    const value = localList[key]
    setStorage(key, value, true)
  }
}

// await proxy.validForm(formRef);
export function validForm(ref, { errorText = '表单校验有误, 请检查' } = {}) {
  return new Promise((resolve, reject) => {
    unref(ref).validate((valid, status) => {
      if (valid) {
        resolve()
      } else {
        if (errorText) {
          $toast(errorText, 'e')
        }
        reject()
      }
    })
  })
}

/**
 * 判断变量是否空值
 * undefined, null, '', '   ', false, 0, [], {} 均返回true，否则返回false
 */
export function isEmpty(sendData) {
  let v = unref(sendData)
  switch (typeof v) {
    case 'undefined':
      return true
    case 'string':
      if (v.trim().length === 0) return true
      break
    case 'boolean':
      if (!v) return true
      break
    case 'number':
      if (0 === v) return true
      break
    case 'object':
      if (null === v) return true
      if (undefined !== v.length && v.length === 0) return true
      for (var k in v) {
        return false
      }
      return true
  }
  return false
}
// 非空
export function notEmpty(v) {
  return !isEmpty(v)
}

// 将两个对象合并, 以第二个对象为准, 如果两个对象, 一个属性有值, 一个没值, name合并后有值; 如果两个属性都有值, 以第二个属性为准
export function merge(obj1, obj2) {
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

export function clone(data) {
  return cloneDeep(data)
}

/**
 * 生成随机数, 第一个参数可传字符串, 空 或者数组
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
  { emailStr = '@qq.com', timeStr = '{m}-{d} {h}:{i}:{s}', startStr = '' } = {},
) {
  let randomStr = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  let res = type
  // 如果传的第一个参数的数组， 说明是下拉框。 下拉框获取的是数组的第一项的值
  if (judgeType(type) === 'array') {
    if (!length) {
      return type[0]
    }
    return type[0][length === 4 ? 'value' : length]
  }
  // 如果是手机号, 生成随机手机号
  if (type === 'phone') {
    let prefixArray = new Array(
      '130',
      '131',
      '132',
      '133',
      '135',
      '136',
      '137',
      '138',
      '170',
      '187',
      '189',
    )
    let i = parseInt(10 * Math.random())
    let res = prefixArray[i]
    for (var j = 0; j < 8; j++) {
      res = res + Math.floor(Math.random() * 10)
    }
    return res
  }
  // 如果是email, 生成随机email
  if (type === 'email') {
    return uuid(startStr, length) + emailStr
  }
  // 如果是时间, 生成时间字符串
  if (type === 'time') {
    return uuid(startStr, length) + ' ' + parseTime(new Date(), timeStr)
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
  for (let i = length; i > 0; --i) {
    res += randomStr[Math.floor(Math.random() * randomStr.length)]
  }
  return res
}

/**
 * 判断传入参数的类型
 * @param {*} type
 * judgeType(new RegExp()) regexp
 * judgeType(new Date()) date
 * judgeType([]) array
 * judgeType({}) object
 * judgeType(null) null
 * judgeType(123) number
 */
export function judgeType(type) {
  if (typeof type === 'object') {
    const objType = Object.prototype.toString
      .call(type)
      .slice(8, -1)
      .toLowerCase()
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
name: [proxy.validate(), proxy.validate('name', { message: '你干嘛哈哈' })],
between: [proxy.validate(), proxy.validate('between', { max: 99 })],
number: [proxy.validate(), proxy.validate('number')],
length: [proxy.validate('length'), proxy.validate()],
phone: [proxy.validate(), proxy.validate('phone')],
confirmRegPwd: [
  proxy.validate('same', { value: toRef(form.value, 'regPwd') }),
],
*/
export function validate(type = 'required', rules = {}) {
  const trigger = rules.trigger || ['blur', 'change']
  const typeMaps = [
    'required',
    'pwd',
    'number',
    'mobile',
    'between',
    'same',
    'length',
  ]
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
      message: rules.message || '请输入 ',
      trigger: trigger,
    }
  }

  // validator: this.validateName,
  if (type === 'pwd') {
    const validateName = (rule, value, callback) => {
      let validFlag = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value)
      if (!validFlag) {
        callback(
          new Error(
            rules.message ||
              '密码需由中文、英文、数字、下划线组成，且不能以下划线开头和结尾',
          ),
        )
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
    const validateNumber = (rule, value, callback) => {
      let validFlag = /^[0-9]+$/.test(value)
      if (!validFlag) {
        callback(new Error('请输入数字'))
      } else {
        callback()
      }
    }
    return {
      validator: validateNumber,
      trigger: trigger,
    }
  }
  if (type === 'mobile') {
    const validatePhone = (rule, value, callback) => {
      let validFlag = new RegExp('^[1][0-9]{10}$').test(value)
      if (!validFlag) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      validator: validatePhone,
      trigger: trigger,
    }
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
      trigger: [blur, trigger],
    }
  }
  if (type === 'length') {
    let min = rules.min ?? 1
    let max = rules.max ?? 5
    return {
      min: min,
      max: max,
      message:
        rules.message || `长度最短为${min}个字符, 长度最大为${max}个字符`,
      trigger: trigger,
    }
  }
  console.error(`校验类型${type}, 不在检验范围内, 请检查`)
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
 * copy('这是要复制的文本');
 *  */
export const copy = (text) => {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

// 给数字加千分位
export function addThousandSeparator(number) {
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
export function log(
  variableStr,
  variable,
  otherInfo = '16行 src/views/test/t3.vue',
) {
  if (isRef(variable)) {
    let unrefVariable = unref(variable)
    _log(toRaw(unrefVariable))
  } else {
    _log(variable)
  }
  function _log(consoleData) {
    if (
      judgeType(consoleData) === 'object' ||
      judgeType(consoleData) === 'array'
    ) {
      console.log(
        `%c${variableStr} ${otherInfo}`,
        'background:#fff; color: blue;font-size: 1.2em',
        JSON.stringify(consoleData, null, '\t'),
      )
    } else {
      console.log(
        `%c${variableStr} ${otherInfo}`,
        'background:#fff; color: blue;font-size: 1.2em',
        consoleData,
      )
    }
  }
  function judgeType(type) {
    if (typeof type === 'object') {
      const objType = Object.prototype.toString
        .call(type)
        .slice(8, -1)
        .toLowerCase()
      return objType
    } else {
      return typeof type
    }
  }
}