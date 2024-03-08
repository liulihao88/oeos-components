let a = [2, 4, 5, 6]
a = []

let obj = {
  id: 7,
  label: '我是4',
}


let res = a.some(v=>{
  return v === obj.id
})

console.log(`1116 13行 example/views/test/e1.js res `, res);
