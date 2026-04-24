/**
 * `Object.prototype.toString` 的别名，适合在需要手动调用 `call` 时直接复用。
 *
 * @example
 * objectToString.call([])
 * // => '[object Array]'
 */
export const objectToString = Object.prototype.toString

/**
 * 获取对象的完整类型字符串。
 *
 * @param value 需要判断的值。
 * @returns 形如 `[object Array]` 的类型结果。
 *
 * @example
 * toTypeString([])
 * // => '[object Array]'
 */
export const toTypeString = (value: unknown): string => objectToString.call(value)

/**
 * 获取对象的原始类型名称。
 *
 * @param value 需要判断的值。
 * @returns 形如 `Array`、`Date`、`Map` 的类型名。
 *
 * @example
 * toRawType(new Map())
 * // => 'Map'
 */
export const toRawType = (value: unknown): string => {
  return toTypeString(value).slice(8, -1)
}

/**
 * 判断值是否为数组。
 *
 * @param value 需要判断的值。
 * @returns 是否为数组。
 *
 * @example
 * isArray([1, 2, 3])
 * // => true
 */
export const isArray = Array.isArray

/**
 * 判断值是否为 `Map`。
 *
 * @param val 需要判断的值。
 * @returns 是否为 `Map`。
 *
 * @example
 * isMap(new Map())
 * // => true
 */
export const isMap = (val: unknown): val is Map<any, any> => toTypeString(val) === '[object Map]'

/**
 * 判断值是否为 `Set`。
 *
 * @param val 需要判断的值。
 * @returns 是否为 `Set`。
 *
 * @example
 * isSet(new Set([1, 2, 3]))
 * // => true
 */
export const isSet = (val: unknown): val is Set<any> => toTypeString(val) === '[object Set]'

/**
 * 判断值是否为 `Date` 对象。
 *
 * @param val 需要判断的值。
 * @returns 是否为 `Date`。
 *
 * @example
 * isDate(new Date())
 * // => true
 */
export const isDate = (val: unknown): val is Date => toTypeString(val) === '[object Date]'

/**
 * 判断值是否为正则对象。
 *
 * @param val 需要判断的值。
 * @returns 是否为 `RegExp`。
 *
 * @example
 * isRegExp(/oeos/i)
 * // => true
 */
export const isRegExp = (val: unknown): val is RegExp => toTypeString(val) === '[object RegExp]'

/**
 * 判断值是否为函数。
 *
 * @param val 需要判断的值。
 * @returns 是否为函数。
 *
 * @example
 * isFunction(() => {})
 * // => true
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (val: unknown): val is Function => typeof val === 'function'

/**
 * 判断值是否为字符串。
 *
 * @param val 需要判断的值。
 * @returns 是否为字符串。
 *
 * @example
 * isString('oeos')
 * // => true
 */
export const isString = (val: unknown): val is string => typeof val === 'string'

/**
 * 判断字符串是否可以被转换成有效数字。
 *
 * @param val 需要判断的字符串。
 * @returns 是否可以安全转换成数字。
 *
 * @example
 * isStringNumber('12.5')
 * // => true
 *
 * @example
 * isStringNumber('12px')
 * // => false
 */
export const isStringNumber = (val: string): boolean => {
  if (!isString(val)) {
    return false
  }
  return !Number.isNaN(Number(val))
}

/**
 * 判断值是否为数字类型。
 *
 * @param val 需要判断的值。
 * @returns 是否为 `number`。
 *
 * @example
 * isNumber(12)
 * // => true
 */
export const isNumber = (val: unknown): val is number => typeof val === 'number'

/**
 * 判断值是否为 `Symbol`。
 *
 * @param val 需要判断的值。
 * @returns 是否为 `Symbol`。
 *
 * @example
 * isSymbol(Symbol('id'))
 * // => true
 */
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'

/**
 * 判断值是否为布尔值。
 *
 * @param val 需要判断的值。
 * @returns 是否为 `boolean`。
 *
 * @example
 * isBoolean(false)
 * // => true
 */
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean'

/**
 * 判断值是否为对象且不为 `null`。
 *
 * @param val 需要判断的值。
 * @returns 是否为对象。
 *
 * @example
 * isObject({ id: 1 })
 * // => true
 */
export const isObject = (val: unknown): val is Record<keyof any, any> => val !== null && typeof val === 'object'

/**
 * 判断值是否为 Promise 风格对象。
 *
 * @param val 需要判断的值。
 * @returns 是否为 Promise。
 *
 * @example
 * isPromise(Promise.resolve(1))
 * // => true
 */
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

/**
 * 判断值是否为普通对象。
 *
 * @param val 需要判断的值。
 * @returns 是否为普通对象。
 *
 * @example
 * isPlainObject({ id: 1 })
 * // => true
 */
export const isPlainObject = (val: unknown): val is Record<keyof any, any> => toTypeString(val) === '[object Object]'

/**
 * 判断值是否为空普通对象。
 *
 * @param val 需要判断的值。
 * @returns 是否为空对象。
 *
 * @example
 * isEmptyObject({})
 * // => true
 */
export const isEmptyObject = (val: unknown): val is Record<keyof any, any> =>
  isPlainObject(val) && Object.keys(val).length === 0

/**
 * 判断字符串是否为合法链接。
 *
 * @param url 需要判断的链接。
 * @returns 是否为合法 URL。
 *
 * @example
 * isUrl('https://oeos-components.com')
 * // => true
 */
export function isUrl(url: string): url is string {
  const regex = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i',
  )
  return regex.test(url)
}

/**
 * 判断节点是否为 `SVGElement`。
 *
 * @param tag 需要判断的节点。
 * @returns 是否为 `SVGElement`。
 *
 * @example
 * const svg = document.querySelector('svg')
 * isSVGElement(svg)
 */
export const isSVGElement = (tag: unknown): tag is SVGElement =>
  typeof SVGElement !== 'undefined' && tag instanceof SVGElement

/**
 * 判断对象是否为 Vue 组件配置。
 *
 * @param val 需要判断的值。
 * @returns 是否像一个 Vue 组件。
 *
 * @example
 * isComponent({
 *   render() {
 *     return null
 *   },
 * })
 */
export const isComponent = (val: unknown): boolean => isPlainObject(val) && (isFunction(val.render) || isFunction(val.setup))

/**
 * 判断当前运行环境是否为 iOS。
 *
 * @returns 是否为 iOS 设备。
 *
 * @example
 * if (isIOS()) {
 *   console.log('当前设备是 iOS')
 * }
 */
export function isIOS(): boolean {
  const isIphone = navigator.userAgent.includes('iPhone')
  const isIpad = navigator.userAgent.includes('iPad')
  return isIphone || isIpad
}
