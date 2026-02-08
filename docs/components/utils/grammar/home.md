# vitepress的一些常用语法(可以在写文档的时候参考)

## Hidden Title {.md-hidden}

### 1. tip提示框

<o-flex gap="16">

::: tip 提示
andy加油.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous.
:::

::: details
This is a details block.
:::

</o-flex>

### 2. 通过`:::demo`使用示例.vue文件

:::demo
button/base
:::

### 3. emoji文字

:tada: :100:

### 4. 高亮显示某一行

```js
export default {
  data() {
    return {
      msg: 'Focused!', // [!code focus]
    }
  },
}
```

### 5. 直接在.md文件中写代码

<span v-for="i in 30">{{ i }}</span>

<script setup>
import { useData } from 'vitepress'

const { page } = useData()
</script>

<pre>{{ page }}</pre>

### 6. 折叠代码

::: details
:::demo
button/base
:::

### 7. 直接在md文档中引入文件

`<<< ../../../../packages/components/test/src/index.vue`

<<< ../../../../packages/components/test/src/index.vue

### 8. 代码组

::: code-group

```sh [pnpm]
pnpm add oeos-components -S
```

```sh [yarn]
yarn add oeos-components
```

```sh [npm]
npm install oeos-components -S
```

### 9. md中常用组件`el-tag`

<el-tag  effect="dark">推荐</el-tag>

### 10. md中进行跳转

[去tooltip组件](../../tooltip/home)

### 11. 在markdown中使用组件不报警告

1. 警告原因分析
你遇到的波浪线警告是由 markdownlint 规则引起的，具体是 MD033 规则触发的。

markdownlint MD033 规则说明
规则名称: MD033/no-inline-html
规则目的: 禁止在 markdown 文件中使用内联 HTML 标签
触发条件: 检测到任何 HTML/XML 风格的标签（包括 Vue 组件标签） 

2. 为什么会出现此警告
虽然 `<o-warning>` 是你的全局 Vue 组件，但在 markdown 解析器看来：

Vue 组件标签仍属于 HTML 风格的标签语法
markdownlint 规则默认不允许任何形式的内联 HTML
即使是自定义组件标签也会被识别为 HTML 标签

3. 解决方案

方案一：禁用特定规则（推荐）
在文件顶部添加 markdownlint 配置：
<!-- markdownlint-disable no-inline-html -->

方案二：配置项目级别 markdownlint 规则
修改 .markdownlint.json 或相应配置文件：
`{
  "no-inline-html": false
}`
