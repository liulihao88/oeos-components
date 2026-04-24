# utils 总览

## Hidden Title {.md-hidden}

本页收录 `@oeos-components/utils` 当前对外导出的全部工具方法，并为每个方法补一个最小示例，方便直接查用法。

以下示例默认已经从 `@oeos-components/utils` 引入对应方法；依赖 `window`、`document`、`localStorage`、`Element Plus` 或 `WebSocket` 的方法，需要在浏览器环境中使用。

### 导出入口

<<< ../../../packages/utils/src/index.ts

### 已有独立文档

- [$toast](/components/utils/$toast/home.md)
- [clone](/components/utils/clone/home.md)
- [confirm](/components/utils/confirm/home.md)
- [dayjs 函数方法](/components/utils/dayjs/home.md)
- [formatBytes](/components/utils/formatBytes/home.md)
- [formatBytesConvert](/components/utils/formatBytesConvert/home.md)
- [formatDurationTime](/components/utils/formatDurationTime/home.md)
- [formatTextToHtml](/components/utils/formatTextToHtml/home.md)
- [formatTime](/components/utils/formatTime/home.md)
- [formatToFixed](/components/utils/formatToFixed/home.md)
- [getType](/components/utils/getType/home.md)
- [isEmpty](/components/utils/isEmpty/home.md)
- [sleep](/components/utils/sleep/home.md)
- [tryCatch](/components/utils/tryCatch/home.md)
- [uuid](/components/utils/uuid/home.md)
- [validForm](/components/utils/validForm/home.md)
- [validate](/components/utils/validate/home.md)

## 函数方法（A-Z）

### $toast

用于快速显示消息提示。

```ts
$toast('保存成功')
$toast('保存失败', 'e')
$toast.success('创建完成')
```

### clearStorage

清理 `localStorage` / `sessionStorage` 中的指定项，或按排除项整体清空。

```ts
clearStorage('token')

clearStorage(['token', 'userInfo'])

clearStorage({ exclude: ['theme', 'language'] })
```

### clone

深拷贝对象；如果传入数组，还可以按次数复制数组内容。

```ts
const obj = clone({ name: 'andy', extra: { id: 1 } })
const list = clone([1, 2, 3], 2)
```

### confirm

基于 `ElMessageBox.confirm` 的确认框封装。

```ts
await confirm('确定删除当前记录吗？', {
  showCancelButton: true,
  confirmButtonText: '删除',
})
```

### copy

复制文本到剪贴板，并默认弹出成功提示。

```ts
copy('oeos-components')
copy('静默复制', { hideToast: true })
```

### debounce

防抖函数，常用于搜索输入、窗口尺寸变化等场景。

```ts
const search = debounce((keyword: string) => {
  console.log('search:', keyword)
}, 300)

search('oeos')
```

### diffDate

计算两个时间之间的差值，默认单位为秒。

```ts
const seconds = diffDate('2026-04-24 12:00:00', '2026-04-24 11:59:00')
const minutes = diffDate('2026-04-24 12:00:00', '2026-04-24 11:30:00', 'minute')
```

### diffDateFromCurrent

将秒数转换成“几分钟前 / 几小时前 / 几天前”这类文案。

```ts
diffDateFromCurrent(45) // 45秒前
diffDateFromCurrent(3600) // 1小时前
```

### formatBytes

把字节数格式化成更易读的单位字符串。

```ts
formatBytes(1024) // 1.00 KB
formatBytes(1048576, { digit: 1, suffix: '/s' }) // 1.0 MB/s
```

### formatBytesConvert

把 `KB / MB / GB` 这类字符串还原成字节数。

```ts
formatBytesConvert('1.5GB')
formatBytesConvert('1,024 KB')
```

### formatDate

使用 `dayjs` 按指定格式输出日期时间。

```ts
formatDate('2026-04-24 12:30:45')
formatDate('2026-04-24 12:30:45', 'YYYY/MM/DD')
```

### formatDateToDay

把日期格式化成 `YYYY-MM-DD`。

```ts
formatDateToDay(new Date())
formatDateToDay('2026-04-24 12:30:45')
```

### formatDateToMinute

把日期格式化成 `YYYY-MM-DD HH:mm`。

```ts
formatDateToMinute(new Date())
formatDateToMinute('2026-04-24 12:30:45')
```

### formatDurationTime

把持续时间时间戳格式化成“天 / 时 / 分 / 秒”文本。

```ts
formatDurationTime(1162821) // 19分22秒
formatDurationTime(5 * 60 * 1000, '{i}分{s}秒')
```

### formatImg

快速拼接静态资源地址。

```ts
formatImg('logo')
formatImg('avatar.png', 'user')
formatImg('icon.svg', 'common', { basePath: 'assets/images' })
```

### formatTextToHtml

将换行和缩进转换为适合直接展示的 HTML 字符串。

```ts
formatTextToHtml('第1行\n第2行\n\t缩进内容')
```

### formatThousands

为数字增加千分位分隔符。

```ts
formatThousands(1234567)
formatThousands('1234567.89MB')
```

### formatTime

把时间格式化成指定模板字符串。

```ts
formatTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')
formatTime(1713926400, '{y}/{m}/{d}')
```

### formatToFixed

按指定小数位补全数字，也支持前后缀和保留单位。

```ts
formatToFixed('22.1', 2) // 22.10
formatToFixed('22 TB', { digit: 2, unit: false, prefix: '$' }) // $22.00
```

### getStorage

从 `localStorage` 或 `sessionStorage` 中读取数据，并自动尝试反序列化。

```ts
const token = getStorage('token')

const userInfo = getStorage<{ id: number; name: string }>('userInfo')

const draft = getStorage('formDraft', true)
```

### getType

返回更直观的小写类型字符串。

```ts
getType([]) // array
getType(new Date()) // date
getType(null) // null
```

### getVariable

读取根节点上的 CSS 变量值。

```ts
const brandColor = getVariable('--vp-c-brand-1')
```

### isArray

判断值是否为数组。

```ts
isArray([1, 2, 3]) // true
isArray({ length: 3 }) // false
```

### isBoolean

判断值是否为布尔值。

```ts
isBoolean(false) // true
isBoolean(0) // false
```

### isComponent

判断对象是否为 Vue 组件配置。

```ts
isComponent({
  render() {
    return null
  },
})
```

### isDate

判断值是否为 `Date` 对象。

```ts
isDate(new Date()) // true
isDate('2026-04-24') // false
```

### isEmpty

判断值是否为空。当前默认不会把 `0` 和 `false` 当成空值。

```ts
isEmpty('   ') // true
isEmpty(0) // false
isEmpty(0, false) // true，兼容旧语义
```

### isEmptyObject

判断值是否为空对象。

```ts
isEmptyObject({}) // true
isEmptyObject({ id: 1 }) // false
```

### isFunction

判断值是否为函数。

```ts
isFunction(() => {}) // true
isFunction('fn') // false
```

### isIOS

根据 `userAgent` 判断当前环境是否为 iOS。

```ts
if (isIOS()) {
  console.log('当前是 iOS 设备')
}
```

### isMap

判断值是否为 `Map`。

```ts
isMap(new Map()) // true
isMap({}) // false
```

### isNumber

判断值是否为数字类型。

```ts
isNumber(12) // true
isNumber('12') // false
```

### isObject

判断值是否为对象且不为 `null`。

```ts
isObject({ id: 1 }) // true
isObject(null) // false
```

### isPlainObject

判断值是否为普通对象。

```ts
isPlainObject({ id: 1 }) // true
isPlainObject(new Date()) // false
```

### isPromise

判断值是否为 Promise 风格对象。

```ts
isPromise(Promise.resolve(1)) // true
isPromise({ then: () => {} }) // false
```

### isRegExp

判断值是否为正则对象。

```ts
isRegExp(/oeos/i) // true
isRegExp('oeos') // false
```

### isSet

判断值是否为 `Set`。

```ts
isSet(new Set([1, 2, 3])) // true
isSet([1, 2, 3]) // false
```

### isString

判断值是否为字符串。

```ts
isString('oeos') // true
isString(123) // false
```

### isStringNumber

判断字符串是否可以被转成有效数字。

```ts
isStringNumber('12.5') // true
isStringNumber('12px') // false
```

### isSVGElement

判断节点是否为 `SVGElement`。

```ts
const svg = document.querySelector('svg')
isSVGElement(svg)
```

### isSymbol

判断值是否为 `Symbol`。

```ts
isSymbol(Symbol('id')) // true
isSymbol('id') // false
```

### isUrl

判断字符串是否为合法链接。

```ts
isUrl('https://oeos-components.com') // true
isUrl('/local/path') // false
```

### log

对 `console.log` 的简单封装，输出时会额外带上变量名。

```ts
const formData = { id: 1, name: 'andy' }
log('formData', formData)
```

### merge

合并两个对象；同名字段都存在时，以第二个对象为准。

```ts
merge(
  { name: '', age: 18, city: 'beijing' },
  { name: 'andy', age: 20, city: '' },
)
```

### objectToString

`Object.prototype.toString` 的直接别名。

```ts
objectToString.call([]) // [object Array]
objectToString.call(new Date()) // [object Date]
```

### onlyTest

测试导出方法。

```ts
onlyTest() // test
```

### processWidth

把宽度值转换成统一的 CSS 写法。

```ts
processWidth(200) // { width: '200px' }
processWidth('50%', true) // 50%
```

### random

生成指定范围内的随机整数。

```ts
random() // 0 ~ 10
random(100, 999) // 100 ~ 999
```

### setStorage

向 `localStorage` 或 `sessionStorage` 写入数据。

```ts
setStorage('token', 'abc123')

setStorage('userInfo', { id: 1, name: 'andy' })

setStorage('formDraft', { keyword: '机房', page: 2 }, true)
```

### sleep

创建一个可 `await` 的延迟。

```ts
await sleep(500)
await sleep(1000, () => console.log('1 秒后执行'))
```

### test

返回当前 utils 构建时间。

```ts
test()
```

### throttle

节流函数，适合滚动、拖拽、窗口变化等高频事件。

```ts
const handleResize = throttle(() => {
  console.log('resize')
}, 300)

window.addEventListener('resize', handleResize)
```

### toLine

把驼峰字符串转换成连接符形式。

```ts
toLine('inputNumber') // input-number
toLine('CompTitle', '_') // comp_title
```

### toRawType

返回更短的原始类型名称。

```ts
toRawType(new Map()) // Map
toRawType([]) // Array
```

### toTypeString

返回完整的 `Object.prototype.toString` 结果。

```ts
toTypeString([]) // [object Array]
toTypeString(Promise.resolve()) // [object Promise]
```

### tryCatch

统一处理 Promise 或任务函数执行结果，返回固定的 `{ data, error }`。

```ts
const loadList = async () => ({ list: [] })

const { data, error } = await tryCatch(() => loadList())
if (!error) {
  console.log(data?.list)
}
```

### uuid

生成随机字符串，也支持手机号、邮箱、时间串、数字等特殊模式。

```ts
uuid() // 普通随机串
uuid('phone') // 随机手机号
uuid('number', 6) // 6 位数字
```

### validate

生成 Element Plus 表单规则，或在 `pureValid=true` 时直接返回布尔结果。

```ts
const mobileRule = validate('mobile')
const isIp = validate('ip', '192.168.1.10', true)
```

### validateTrigger

在 `validate` 基础上补齐默认 `blur` / `change` 触发时机。

```ts
const nameRule = validateTrigger('required', {
  message: '请输入名称',
})
```

### validForm

对 `el-form` 的 `validate` 做 Promise 封装，便于直接 `await`。

```ts
await validForm(formRef)
await validForm(formRef, {
  message: '请先完善表单信息',
  detail: true,
})
```

### WS

WebSocket 的简单封装，支持自动重连、心跳和 query 参数。

```ts
const ws = new WS('wss://example.com/ws', {
  autoReconnect: true,
  heartbeat: {
    message: 'ping',
    interval: 3000,
  },
  query: {
    token: 'demo-token',
  },
})

ws.onMessage((message) => {
  console.log(message)
})

ws.send('hello')
```
