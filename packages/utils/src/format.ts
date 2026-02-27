import { isStringNumber, isNumber } from './is'
import { getType } from './base'
/**
 * 现有方法如下
 * formatTime(time, cFormat = '{y}-{m}-{d} {h}:{i}:{s}')
 * formatDurationTime(timestamp, cFormat = '{d} 天 {h} 时 {i} 分 {s} 秒')
 * formatImg(photoName, addPath = '', { basePath = 'assets/images' } = {})
 * formatThousands(number)
 * formatBytes(bytes)
 * formatBytesConvert(bytes)
 * formatNewLines(str)
 */

/**
 * 格式化字节单位
 * @param bytes - 字节数
 * @param options - 配置项
 * @param options.digit - 小数位数（默认2）
 * @param options.thousands - 是否千分位分隔（默认true）
 * @param options.prefix - 前缀（默认空）
 * @param options.suffix - 后缀（默认空）
 * @param options.roundType - 取整方式：'floor'（向下, 默认） | 'ceil'（向上） | 'round'（四舍五入）
 */

/**
 *
 * @param bytes 字节
 * @param options 选项
 * @example
 * formatBytes(0.999) => 0.99B
 * formatBytes(1040000, { digit: 3, prefix: "$", suffiex: "/s", roundType: "round", thousands: true }) => $1,015.625 KB
 */
export function formatBytes<
  const T extends {
    digit?: number
    prefix?: string
    suffix?: string
    roundType?: 'floor' | 'ceil' | 'round'
    thousands?: boolean
  } = {
    digit: 2
    prefix: ''
    suffix: ''
    roundType: 'floor'
    thousands: false
  },
>(bytes: number | string, options?: T) {
  let { digit = 2, thousands = false, prefix = '', suffix = '', roundType = 'floor' } = options ?? {}
  // 校验输入
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

  // 根据 roundType 选择取整方式
  const power = Math.pow(k, i)
  let num = bytes / power

  num = Math[roundType](num * Math.pow(10, digit)) / Math.pow(10, digit)

  let res = num.toFixed(digit) + ' ' + sizes[i]

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
 * formatBytesConvert('1,234 GB', {digit: 2}) 1324997410816.00
 */
export function formatBytesConvert(oBytes, { thounsands = false, digit = 0 } = {}) {
  let bytes = oBytes
  if (isStringNumber(oBytes) || isNumber(oBytes) || getType(oBytes) !== 'string') {
    return parseDigitThounsands(oBytes)
  }
  if (!oBytes) {
    return parseDigitThounsands(oBytes)
  }

  // 如果有千分位, 先将千分位的,去掉
  const regex = /^\d{1,3}(,\d{3})*(\.\d+)?[a-zA-Z ]*$/
  if (regex.test(oBytes)) {
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
  function parseDigitThounsands(val) {
    let finalRes = val
    if (digit) {
      finalRes = Number(finalRes).toFixed(digit)
    }
    if (thounsands) {
      finalRes = formatThousands(finalRes)
    }
    return finalRes
  }
  return parseDigitThounsands(size * units[unit])
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

type TimeType = Date | string | number | null | undefined
type FormatType = string
/**
 * 时间格式化函数
 * @param {TimeType} time - 可选时间参数，可以是 Date 对象、时间戳字符串或数字
 * @param {FormatType} [cFormat='{y}-{m}-{d} {h}:{i}:{s}'] - 格式化字符串
 * @returns {string} 格式化后的时间字符串
 */

export function formatTime(time: TimeType = new Date(), cFormat: FormatType = '{y}-{m}-{d} {h}:{i}:{s}'): string {
  if (!time) {
    return String(time)
  }

  let date: Date
  const timeStr = String(time)

  if (typeof time === 'object' && time instanceof Date) {
    date = time
  } else {
    // ISO格式正则表达式
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?$/

    if (isoRegex.test(timeStr)) {
      date = new Date(time)
    } else {
      // 处理小数时间戳（如 1764128798.456）
      if (timeStr.includes('.') && !isNaN(parseFloat(timeStr))) {
        date = new Date(parseFloat(timeStr) * 1000)
      }
      // 处理整数时间戳（10位数字）
      else if (/^\d{10}$/.test(timeStr)) {
        date = new Date(parseInt(timeStr) * 1000)
      }
      // 其他情况直接解析
      else {
        date = new Date(time)
      }
    }
  }

  // 验证日期是否有效
  if (isNaN(date.getTime())) {
    throw new Error('Invalid Date')
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
    const value = formatObj[key]

    // 处理星期几
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }

    // 处理补零
    if (result.length > 0 && value < 10) {
      return '0' + value
    }

    return value
  })
}

/**
 *
 * @param timestamp 持续的时间戳
 * @param cFormat 格式化的规则 {d}天{h}时{i}分{s}秒
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
    parseFormat = cFormat.match(/{h}.*/g)?.[0] ?? ''
    if (hours === 0) {
      parseFormat = cFormat.match(/{i}.*/g)?.[0] ?? ''
      if (minutes === 0) {
        parseFormat = cFormat.match(/{s}.*/g)?.[0] ?? ''
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

/**
 * 增加小数点
 * formatToFixed(22) -> '22.00'
 *
 * formatToFixed('22') -> '22.00'
 *
 * formatToFixed('22', 4) -> '22.0000'
 *
 * formatToFixed('22', 2) -> 22
 *
 * formatToFixed('22 TB', {prefix: '$', suffix: '%', unit: false}) -> $22.00%
 */

// 这样定义 - 直接把所有可能的选项都写成具体的类型
export function formatToFixed<
  const T extends {
    digit?: number
    prefix?: string
    suffix?: string
    unit?: boolean
    thousands?: boolean
  } = {
    digit: 2
    prefix: ''
    suffix: ''
    unit: true
    thousands: false
  },
>(value: any, options?: T | number | any): string {
  if (typeof options === 'number') {
    options = { digit: options }
  }

  const finalOptions = {
    digit: 2,
    prefix: '',
    suffix: '',
    unit: true,
    thousands: false,
    ...options,
  }
  const { digit, prefix, suffix, unit, thousands } = finalOptions

  let matches = ('' + value).match(/^([\d,]+)(\.?)(\d+)?(\D+)?$/)
  if (!matches) {
    return value
  }

  let numericString = matches[1].replace(/\D/g, '')
  let decimalString = matches[3] ? `.${matches[3]}` : ''
  let finalUnit = matches[4] || ''

  let res = numericString
  if (isStringNumber(numericString) || isNumber(numericString)) {
    res = Number(numericString + decimalString).toFixed(digit)
  }

  if (thousands) {
    res = formatThousands(res)
  }

  if (!unit) {
    finalUnit = ''
  }

  return `${prefix}${res}${finalUnit}${suffix}`
}
