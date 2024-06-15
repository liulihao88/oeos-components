const { execSync } = require('child_process')
const vName = execSync('git name-rev --name-only HEAD', {
  encoding: 'utf-8',
}).trim()
const commitHash = execSync('git show -s --format=%H', {
  encoding: 'utf-8',
}).trim()
const name = execSync('git show -s --format=%cn', { encoding: 'utf-8' }).trim()
const date = dateFormat(new Date(execSync('git show -s --format=%cd', { encoding: 'utf-8' })))
const message = execSync('git show -s --format=%s', {
  encoding: 'utf-8',
}).trim()
const getBuildTime = dateFormat(new Date())
const userName = execSync('git config user.name', { encoding: 'utf-8' })

module.exports = {
  buildInfos: `oeos-components构建人：${userName.trim()}\n构建时间：${getBuildTime}\ngit分支名称：${vName}\ngit提交人：${name}\ngit提交日期：${date}\ngit提交描述：${message}\nsha1：${commitHash}\n`,
}

function dateFormat(time = new Date(), cFormat = '{y}-{m}-{d} {h}:{i}:{s}') {
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = cFormat.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key] // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
