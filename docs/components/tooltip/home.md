# Tooltip 文字提示组件

`o-tooltip` 基于 Element Plus `el-tooltip` 封装，额外提供了“文本溢出时才显示提示”和“多行省略”能力，适合表格列、描述信息、按钮说明等场景。

[Element Plus Tooltip 文档](https://element-plus.org/zh-CN/component/tooltip.html)

## Hidden Title {.md-hidden}

### 基础用法

:::demo
tooltip/base
:::

### 主题与点击事件

:::demo
tooltip/usually
:::

### 最大行数

:::demo `line-clamp`
tooltip/lineClamp
:::

### 触发方式

:::demo `'hover' | 'click' | 'focus' | 'contextmenu'`，也支持数组形式
tooltip/trigger
:::

### 自定义主题和禁用状态

:::demo
tooltip/other
:::

### 显示 HTML / VNode 内容

:::demo `raw-content`
tooltip/html
:::

### 自定义插槽

:::demo `default|content`
tooltip/slot
:::

### 受控模式

:::demo `visible`
tooltip/visible
:::

### 组件属性

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `width` | 默认文本触发区域最大宽度 | string | `100%` |
| `lineClamp` | 默认文本区域最大展示行数，`1` 表示单行省略 | string / number | `1` |
| `showSlot` | 是否渲染默认触发内容区域 | boolean | `true` |
| `effect` | tooltip 主题，会透传给 `el-tooltip` | string | `dark` |
| `tooltipAttrs` | 额外透传给 `el-tooltip` 的配置 | object | `{}` |

### 常用透传属性

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `content` | 提示内容；未传默认插槽时，也会作为默认展示文本 | string / VNode | - |
| `placement` | tooltip 弹出位置 | string | Element Plus 默认值 |
| `trigger` | 触发方式，支持单个值或数组 | string / string[] | Element Plus 默认值 |
| `visible` | 受控显示状态 | boolean | - |
| `disabled` | 是否禁用 tooltip | boolean | `false` |
| `raw-content` | 是否将 `content` 按 HTML 字符串渲染 | boolean | `false` |

### 事件

| 事件名 | 说明 |
| :----: | ---- |
| `click` | 点击触发内容区域时触发 |

### 插槽

| 插槽名 | 说明 |
| :----: | ---- |
| `default` | 自定义触发区域；常用于包裹按钮、图标等元素 |
| `content` | 自定义 tooltip 内容 |

### 说明

- 未传默认插槽时，组件会把 `content` 作为展示文本，并在文本超出可视区域后才显示 tooltip。
- 传入默认插槽后，tooltip 会按正常交互触发，不再做文本溢出判断。
- 设置 `lineClamp` 大于 `1` 后，会按最大行数进行多行省略；超出可视高度时同样会显示 tooltip。
- `lineClamp` 只作用于组件默认渲染的文本区域，不影响自定义触发插槽的布局。
- `content` 支持字符串、HTML 字符串、VNode，以及 `content` 插槽形式的动态内容。
- 更多配置请参考 Element Plus Tooltip 文档。
