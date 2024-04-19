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
