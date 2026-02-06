# svg图标组件

[https://github.com/vbenjs/vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons)

## Hidden Title {.md-hidden}

<o-warning content="注意: 如果svg本身不支持改变颜色, 那么设置<code>color</code>也是不起作用的 . 如果希望svg能够改变颜色, 那需要将svg的代码中的<code>fill</code>改为<code>currentColor</code>" type="warning"></o-warning>

svg图片存放地址: docs/.vitepress/theme/assets/svg

### 安装和使用

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

### 基础用法

:::demo 之所以, options为空, 加红色边框, 是为了减少不必要的点击后才知道数据为空的操作
svg/base
:::

### 通常用法

:::demo
svg/usually
:::
