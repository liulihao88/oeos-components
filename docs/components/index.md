### 快速上手

::: tip 提示

oeos-v3-components 是基于 vue3 + ts + Element-plus 再次封装的基础组件, 适用于创云公司内部的前端项目开发

:::

### 安装

```bash:no-line-numbers
npm install oeos-v3-components
&
pnpm add oeos-v3-components
```


### 使用
> #### 前提条件：使用项目必须全局注册 Element-plus组件库

```js
// main.ts
import oeosV3Components from 'oeos-v3-components'
import 'oeos-v3-components/dist/style.css'
const app = createApp(App)
app.use(oeosV3Components)
app.mount('#app')
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


