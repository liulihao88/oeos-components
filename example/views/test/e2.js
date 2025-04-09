let bytes = '123.45 kb'

const regex = /^(\d+(\.\d+)?)\s*([a-zA-Z]+)?$/
const match = bytes.match(regex)

const number = parseFloat(match[1])
const unit = match[3] ? match[3].toUpperCase() : null
console.log(`32 unit`, unit);
