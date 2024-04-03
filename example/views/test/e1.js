function random(min = 0, max = 10) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

for (let i = 0; i < 100; i++) {
  console.log(random(0, 100))
}
