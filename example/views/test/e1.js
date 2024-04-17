let o1 = {}
let o2 = {
  name: 'andy',
  age: 18,
}
let o3 = {
  name: '',
  age: '',
}

let o12 = Object.assign({}, o2, o1)
console.log(`o12`, o12);

let o23 = Object.assign({}, o2, o3)
console.log(`o23`, o23)
