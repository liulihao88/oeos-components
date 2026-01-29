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
[去tooltip组件](../../tooltip/base)