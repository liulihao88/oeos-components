### 快速上手

::: tip 提示

oeos-components 是基于 Vue3 + Element-plus 再次封装的基础组件, 适用于前端项目开发

:::

### 安装

> npm

```bash:no-line-numbers
npm install oeos-components
```

> pnpm

```bash:no-line-numbers
pnpm add oeos-components
```

### 使用

> #### 前提条件：使用项目必须全局注册 Element-plus组件库

```js
// main.ts
import oeosComponents from 'oeos-components'
import 'oeos-components/dist/style.css'
const app = createApp(App)
app.use(oeosComponents)
app.mount('#app')
```

### 引入函数库方法

```js
// 将oeos-components下的公共函数赋值到全局
import { utils } from 'oeos-components'
Object.keys(utils).forEach((v) => {
app.config.globalProperties[v] = utils[v]
})

// 按需引入
import { $toast } from 'oeos-components'
$toast('我是成功提示')
$toast('我是失败提示', 'e')

// 方法列表
setStorage,
getStorage,
clearStorage,
isEmpty,
notEmpty,
merge,
clone,
uuid,
getType,
sleep,
validate,
asyncWrapper,
formatImg,
copy,
addThousandSeparator
$toast,
```

### 自定义指令

不必注册, 直接使用

```
v-copy
v-number
v-focus
```

### docs文档结构目录

```
├─ examples               # VPDemo组件自动解析此文件夹下的所有.vue文件
├─ components             # .md文件
├─ public                 # 静态资源文件
├─ .vitepress
│  ├─ config              # 插件配置
|  │  ├─ global.ts        # 全局变量定义
|  │  └─ plugins.ts       # 自定义.md文件渲染
│  ├─ theme               # 主题配置
│  ├─ utils               # 文档展开隐藏代码高亮
│  ├─ vitepress
|  │  ├─ vp-demo          # VPDemo组件源码
|  │  ├─ style            # VPDemo组件样式
|  │  └─ index.ts         # 暴露VPDemo组件
│  └─ config.ts           # vitepress配置文件
├─ index.md               # 文档home页面
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.ts         # vite 全局配置文件（支持tsx）
```
