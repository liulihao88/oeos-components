# 项目常见写法

## Hidden Title {.md-hidden}

### 说明

- 该页面用于记录 `oeos-components` 仓库里常见且推荐复用的写法。
- 新增组件、补文档、封装工具方法时，建议优先参考这里和现有同类目录。

### 1. 新增一个组件时，目录通常这样放

```text
packages/components/foo/
├─ index.ts
└─ src/index.vue

docs/components/foo/
├─ home.md
├─ base.vue
└─ usually.vue
```

- 通用基础组件通常放在 `packages/components/*`。
- 偏业务的公司内部组件通常放在 `packages/components/company/*`。
- 文档示例通常放在 `docs/components/*`，一个组件一个目录。

### 2. 组件源码一般放在 `src/index.vue`

```vue
<script setup lang="ts" name="OFoo">
import { computed, ref, useAttrs, useSlots, watch } from 'vue'

const attrs = useAttrs()
const slots = useSlots()
const emits = defineEmits(['change', 'update:modelValue'])

const props = defineProps({
  modelValue: {
    type: [String, Number, Array],
  },
  width: {
    type: [String, Number],
    default: '',
  },
})
</script>
```

- `props` 主要定义当前封装自己新增的能力。
- `attrs` 通常继续透传给底层 `element-plus` 组件。
- 如果组件支持 `v-model`，一般会同时保留 `update:modelValue` 和业务事件。

### 3. 常见的 attrs 透传写法

```vue
<el-select
  v-bind="{
    clearable: true,
    filterable: true,
    ...Object.entries($attrs).reduce((obj, [key, value]) => {
      if (key !== 'class' && key !== 'style') {
        obj[key] = value
      }
      return obj
    }, {}),
  }"
/>
```

- 常见做法是先在本地设置默认值，再把剩余属性透传下去。
- `class` 和 `style` 往往会单独处理，避免覆盖组件自身样式。

### 4. 包装组件时，常见的插槽转发写法

```vue
<template v-for="(arg, name, index) in noDefaultSlots" v-slot:[name]>
  <slot :name="name" v-bind="arg" :index="index" />
</template>
```

```ts
const noDefaultSlots = computed(() => {
  const copySlots = proxy.clone(slots)
  delete copySlots.default
  delete copySlots.label
  return copySlots
})
```

- 这种写法常见于封装 `el-select`、`el-table` 一类本身插槽很多的组件。
- 目的通常是让外部还能继续使用底层组件的大部分插槽能力。

### 5. 组件对外导出时，通常走 `withInstall`

```ts
import Foo from './src/index.vue'
import { withInstall } from '@/components/utils/withInstall.ts'

const OFoo = withInstall(Foo)
export default OFoo
```

- 这样组件既能被全局注册，也能支持按需引入。
- 基础组件目录里通常都会有一个 `index.ts` 专门做这件事。

### 6. 通过 `globalComponentConfig` 配置组件全局默认值

`o-select` 和 `o-table` 当前都在用这个模式。

```ts
// 组件内部统一走 hook
const mergedProps = useGlobalComponentConfig('oSelect', props)
```

```ts
// main.ts 中全局传入
const app = createApp(App)

app.use(OeosComponents, {
  globalComponentConfig: {
    oSelect: {
      showPrefix: true,
    },
    oTable: {
      showIndex: false,
      showPage: false,
      pageSizes: [10, 30, 50, 100],
    },
  },
})
```

- 这种写法适合做“组件默认行为”的统一配置，比如 `showPrefix`、`showQuick` 一类开关。
- 当前 `select` 会读取 `GLOBAL_COMPONENT_CONFIG.oSelect`，`table` 会读取 `GLOBAL_COMPONENT_CONFIG.oTable`，再生成 `mergedProps` 给内部逻辑使用。
- 如果一个组件也要支持这种能力，通常做法是：组件内部直接调用 `useGlobalComponentConfig('组件key', props)`。
- 如果只希望某个页面或某个模块下生效，也可以在父组件的 `setup` 里继续使用 `provide('GLOBAL_COMPONENT_CONFIG', ...)` 做局部覆盖。
- 需要注意：当前组件里的合并顺序是 `...props, ...globalConfig?.xxx`，所以同名字段会以后面的全局配置为准；如果后续想改成“本地传参优先”，需要把顺序调成 `...globalConfig?.xxx, ...props`。

### 7. 文档页通常拆成 `home.md + 多个 demo.vue`

```md
### 基础用法

:::demo
foo/base
:::
```

- `home.md` 负责目录、说明、属性表和事件表。
- 具体交互示例通常拆成同级 `.vue` 文件，避免一个文档页过长。
- 文档页顶部一般会保留 `## Hidden Title {.md-hidden}` 这一行，和当前仓库风格保持一致。

### 8. 工具方法通常按“实现文件 + 统一导出 + 对应文档”组织

```text
packages/utils/src/base.ts
packages/utils/src/index.ts
docs/components/utils/isEmpty/home.md
```

- 单个函数实现通常放在 `packages/utils/src/*` 下。
- 对外统一从 `packages/utils/src/index.ts` 导出。
- 文档通常放在 `docs/components/utils/*/home.md`，路径尽量和函数名保持一致。

### 9. 新增文档或组件后，通常别忘了检查这些地方

- `docs/.vitepress/config.ts` 里是否补了侧边栏入口。
- 组件目录下是否有 `index.ts`，这样才能被 `packages/index.ts` 自动收集。
- `docs/components/xxx/home.md` 是否已经引用了对应示例。
- 提交前建议至少跑一次 `pnpm build`；如果本次改动涉及文档结构，也建议补跑 `pnpm docsbuild`。

### 说明

- 本页偏“仓库协作约定”和“高频套路”，不是严格规范。
- 如果后续团队形成了更稳定的约定，可以继续在这个页面上补充和调整。
