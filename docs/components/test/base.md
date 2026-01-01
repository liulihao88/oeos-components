# test测试组件. 仅用于本地测试, 不属于任何组件

:::demo
OTest/base
:::

## Hidden Title {.md-hidden}

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

### 基础用法

:::demo
OTest/base
:::

:tada: :100:

```js
export default {
  data() {
    return {
      msg: 'Focused!', // [!code focus]
    }
  },
}
```

---
{
  "title": "Blogging Like a Hacker",
  "editLink": true
}
---

<span v-for="i in 30">{{ i }}</span>



<script setup>
import { useData } from 'vitepress'

const { page } = useData()
</script>

<pre>{{ page }}</pre>