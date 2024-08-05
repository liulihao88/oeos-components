# svg图标组件

https://github.com/vbenjs/vite-plugin-svg-icons

## 1. 安装和使用

```js
pnpm i vite-plugin-svg-icons -D

// vite.config.ts
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// 这里最重要的把svg路径配置进去, 否则会找不到
plugins: [
  createSvgIconsPlugin({
    iconDirs: [path.resolve(__dirname, './src/assets/svg')],
    symbolId: 'icon-[dir]-[name]',
  }),
],

// main.ts
import 'virtual:svg-icons-register'

// 可以使用了
<o-svg name="test" color="blue"></o-svg> 
```

## 基础用法

:::demo 之所以, options为空, 加红色边框, 是为了减少不必要的点击后才知道数据为空的操作
OSvg/base
:::

### 通常用法

:::demo
OSvg/usually
:::
