import dayjs from 'dayjs'
import type { ConfigType, OpUnitType, QUnitType } from 'dayjs'

type DayUnit = QUnitType | OpUnitType

/**
 * 使用 `dayjs` 格式化日期。
 *
 * @param date 要格式化的日期值。为空时默认使用当前时间。
 * @param format 输出格式，默认 `YYYY-MM-DD HH:mm:ss`。
 * @returns 格式化后的日期字符串。
 *
 * @example
 * formatDate('2026-04-24 12:30:45')
 * // => '2026-04-24 12:30:45'
 *
 * @example
 * formatDate('2026-04-24 12:30:45', 'YYYY/MM/DD')
 * // => '2026/04/24'
 */
export function formatDate(date?: ConfigType, format = 'YYYY-MM-DD HH:mm:ss'): string {
  return dayjs(date || new Date()).format(format)
}

/**
 * 将日期格式化为 `YYYY-MM-DD`。
 *
 * @param date 要格式化的日期值。
 * @returns 形如 `2026-04-24` 的字符串。
 *
 * @example
 * formatDateToDay(new Date())
 *
 * @example
 * formatDateToDay('2026-04-24 12:30:45')
 * // => '2026-04-24'
 */
export const formatDateToDay = (date: ConfigType): string => formatDate(date, 'YYYY-MM-DD')

/**
 * 将日期格式化为 `YYYY-MM-DD HH:mm`。
 *
 * @param date 要格式化的日期值。
 * @returns 形如 `2026-04-24 12:30` 的字符串。
 *
 * @example
 * formatDateToMinute(new Date())
 *
 * @example
 * formatDateToMinute('2026-04-24 12:30:45')
 * // => '2026-04-24 12:30'
 */
export const formatDateToMinute = (date: ConfigType): string => formatDate(date, 'YYYY-MM-DD HH:mm')

/**
 * 计算两个日期之间的差值。
 *
 * @param date1 起始时间。未传时返回 `undefined`。
 * @param date2 对比时间，默认取当前时间。
 * @param format 差值单位，默认 `second`。
 * @returns 两个时间的差值。
 *
 * @example
 * diffDate('2026-04-24 12:00:00', '2026-04-24 11:59:00')
 * // => 60
 *
 * @example
 * diffDate('2026-04-24 12:00:00', '2026-04-24 11:30:00', 'minute')
 * // => 30
 */
export function diffDate(date1: ConfigType, date2: ConfigType = dayjs(), format: DayUnit = 'second'): number | undefined {
  if (!date1) return
  return dayjs(date1).diff(dayjs(date2), format)
}

/**
 * 将秒数转换成“几秒前 / 几分钟前 / 几小时前 / 几天前”这类相对时间文案。
 *
 * @param second 距离当前时间的秒数。
 * @returns 中文相对时间描述。
 *
 * @example
 * diffDateFromCurrent(45)
 * // => '45秒前'
 *
 * @example
 * diffDateFromCurrent(3600)
 * // => '1小时前'
 */
export function diffDateFromCurrent(second: number): string {
  if (second >= 60 * 60 * 24 * 365) {
    return `${parseInt(String(second / (60 * 60 * 24 * 365)))}年前`
  }
  if (second >= 60 * 60 * 24 * 30) {
    return `${parseInt(String(second / (60 * 60 * 24 * 30)))}月前`
  }
  if (second >= 60 * 60 * 24) {
    return `${parseInt(String(second / (60 * 60 * 24)))}天前`
  }
  if (second >= 60 * 60) {
    return `${parseInt(String(second / (60 * 60)))}小时前`
  }
  if (second >= 60) {
    return `${parseInt(String(second / 60))}分钟前`
  }
  return `${parseInt(String(second))}秒前`
}
