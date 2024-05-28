// 示例用法
let obj = {
  3000: true,
  click: true,
  scroll: true,
}

function getValueByNumberKey(obj) {
  let res = []
  for (let key in obj) {
    console.log(`99 key`, key)
    if (!isNaN(Number(key)) && typeof Number(key) === 'number') {
      res.push(Number(key))
    } else {
      console.log(`55 key`, key);
      res.push(key)
    }
  }
  return res
}

console.log(`getValueByNumberKey(obj)`, getValueByNumberKey(obj))
