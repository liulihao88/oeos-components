# tooltip文字提示组件

[https://element-plus.org/zh-CN/component/tooltip.html](https://element-plus.org/zh-CN/component/tooltip.html)

> 文字超出才显示tooltip, 否则不显示

## Hidden Title {.md-hidden}

### 基础用法

:::demo
tooltip/base
:::

### 通常用法

:::demo
tooltip/usually
:::

### other

:::demo
tooltip/other
:::

### trigger

:::demo `'hover' | 'click' | 'focus' | 'contextmenu'`或者数组(选项是trigger这四个属性)
tooltip/trigger
:::

### 显示`HTML`内容

:::demo `raw-content`
tooltip/html
:::

### slot

:::demo `default|content`
tooltip/slot
:::

### 受控模式

:::demo `visible`
tooltip/visible
:::

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `width` | 文本区域最大宽度 | string | `100%` |
| `showSlot` | 是否渲染默认触发内容区域 | boolean | `true` |
| `effect` | tooltip 主题 | string | `dark` |
| `tooltipAttrs` | 额外 tooltip 配置 | object | `{}` |

### 事件

| 事件名 | 说明 |
| :----: | ---- |
| `click` | 点击触发内容区域时触发 |

### 插槽

| 插槽名 | 说明 |
| :----: | ---- |
| `default` | 触发 tooltip 的内容 |
| `content` | 自定义 tooltip 内容 |

### 说明

- 默认在文本超出容器宽度时才显示 tooltip。
- `content` 支持字符串、插槽，以及 VNode 形式的动态内容。
