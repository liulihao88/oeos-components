# tabs切换组件

[Element Plus Tabs Documentation](https://element-plus.org/zh-CN/component/tabs.html)

## Hidden Title {.md-hidden}

### 基础用法

:::demo
tabs/base
:::

### 通常用法

:::demo
tabs/usually
:::

### Slots

:::demo
tabs/slot
:::

### Trigger `click|hover`

:::demo
tabs/trigger
:::

### children `支持嵌套 el-tab-pane`

:::demo
tabs/children
:::

### other

:::demo
tabs/other
:::

### addRemove

:::demo
tabs/addRemove
:::



### 位置

可以通过 tab-position 设置标签的位置

标签一共有四个方向的设置 tabPosition="left|right|top|bottom"

:::demo
tabs/location
:::

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `modelValue` | 当前激活 tab | string / number / boolean | - |
| `options` | 标签页配置 | array | `[]` |
| `label` | 标签标题字段名 | string | `label` |
| `value` | 标签值字段名 | string | `value` |
| `subAttrs` | 透传给 `el-tab-pane` 的属性 | object | `{}` |
| `trigger` | 切换触发方式，支持 `click` / `hover` | string | `click` |

### 事件

| 事件名 | 说明 |
| :----: | ---- |
| `update:modelValue` | 当前激活 tab 变化时触发 |

### 插槽

| 插槽名 | 说明 |
| :----: | ---- |
| `default` | 自定义整个 tabs 内容 |
| `${value}` | 自定义每个 tab-pane 内容，名称为选项值 |
| `${value}-label` | 自定义每个 tab 标题区域 |
