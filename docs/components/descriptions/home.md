# Descriptions 描述列表

[Element Plus 描述组件文档](https://element-plus.org/zh-CN/component/descriptions.html)

## Hidden Title {.md-hidden}

### 基础用法

:::demo
descriptions/base
:::

### 通常用法

:::demo
descriptions/usually
:::

### 每行展示多少项

:::demo
descriptions/column
:::

### 垂直列表

:::demo
descriptions/vertical
:::

### slot插槽

:::demo
descriptions/slot
:::

### 自定义样式

:::demo
descriptions/customStyle
:::

### API

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `options` | 描述项配置列表 | `ItemOptions[]` | - |
| `column` | 一行展示的描述项数量 | number | `3` |
| `labelWidth` | label 宽度，传 `auto` 时会按最长 label 自动计算 | string / number | `auto` |
| `showAll` | 是否完整展示文本；为 `false` 时通过 `o-tooltip` 省略展示 | boolean | `false` |

### ItemOptions

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `label` | 标签文本 | string | - |
| `value` | 内容值 | any | - |
| `labelSlot` | 自定义 label 插槽名 | string | - |
| `valueSlot` | 自定义 value 插槽名 | string | - |
| `labelRender` | 自定义 label 渲染函数 | `(item) => VNode \| string` | - |
| `render` | 自定义 value 渲染函数 | `(item) => VNode \| string` | - |
| `filter` | 内容值格式化函数 | `(value) => any` | - |
| `attrs` | 透传给 `el-descriptions-item` 的属性 | object | - |
| `labelAttrs` | 透传给 label 内部 `o-tooltip` 的属性 | object | - |
| `valueAttrs` | 透传给 value 内部 `o-tooltip` 的属性 | object | - |

### 插槽

| 插槽名 | 说明 | 插槽参数 |
| :----: | ---- | -------- |
| `default` | 自定义完整描述内容，会覆盖 `options` 渲染 | - |
| `labelSlot` 对应名称 | 自定义某一项 label | `{ item, label, value, index }` |
| `valueSlot` 对应名称 | 自定义某一项 value | `{ item, label, value, index }` |

### 透传属性

- 组件默认开启 `border`，其他属性会继续透传给 Element Plus `el-descriptions`。
