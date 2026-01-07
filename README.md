# element-plus二次封装

使用vue3+element-plus封装前端组件。以利于前端组件化和工程化开发

## 1. 组件的使用

### 在vue3项目的main.js里引入

```js
import 'oeos-components/dist/style.css'
import OeosComponets from 'oeos-components'
app.use(OeosComponets)
```

### 在任何一个.vue文件下, 可直接引入组件

```js
<o-button>这是o-button</o-button>
<o-title title="这是o-title"></o-title>
```

## 2. 在vue3项目中使用公共函数, 安装@oeos-components/utils

```js
// 如果想将所有函数挂载至全局使用
import * as utils from '@oeos-components/utils'
// 将oeos-components下的公共函数赋值到全局
Object.keys(utils).forEach((v) => {
  app.config.globalProperties[v] = utils[v]
})
然后通过`proxy.$toast('哈哈')`, 这种方式去使用函数

// 如果想单独的引用某个函数
import { $toast } from '@oeos-components/utils'
$toast('嘿嘿')
```

## 3. 在vue3项目中使用自定义指令

当前项目支持的自定义指令有以下

```
v-copy
v-number
v-focus
```

更多内容请查看[文档](https://liulihao88.github.io/oeos-components/)
