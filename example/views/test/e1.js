function formatWeek(date = new Date()) {
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return days[date.getDay()]
}

console.log(`formatWeek()`, formatWeek())
