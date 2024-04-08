console.log(processWidth(200)) // { width: '200px' }
console.log(processWidth('200', true)) // 200px
console.log(processWidth('200.33px')) // { width: '200.33px' }
console.log(processWidth('')) // {}

function processWidth(value, isBase = false) {
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
  } else if (
    typeof value === 'string' &&
    /^[0-9]+(\.[0-9]+)?(px|%|em|rem|vw|vh|ch)*$/.test(value)
  ) {
    res = value
  } else {
    throw new Error(`${value} is Invalid unit provided`)
  }
  if (isBase) {
    return res
  }
  return { width: res }
}
