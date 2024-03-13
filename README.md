#### 1. 组件的使用

1. 在vue3项目的main.js里引入

```js
import 'oeos-v3-components/dist/style.css'
import oeosV3Componets from 'oeos-v3-components'
app.use(oeosV3Componets)
```

2. 在任何一个.vue文件下, 可直接引入组件

```js
<o-button>这是o-button</o-button>
<o-title title="这是o-title"></o-title>
```

3 在vue3项目中使用公共函数

```js
// 如果想将所有函数挂载至全局使用
import { utils } from 'oeos-v3-components'
// 将oeos-v3-components下的公共函数赋值到全局
Object.keys(utils).forEach((v) => {
  app.config.globalProperties[v] = utils[v]
})
然后通过`proxy.$toast('哈哈')`, 这种方式去使用函数

// 如果想单独的引用某个函数
import { $toast } from 'oeos-v3-components'
$toast('嘿嘿')
```

4. 在vue3项目中使用自定义指令
   当前项目支持的自定义指令有以下

```
v-copy
v-number
v-focus
```
