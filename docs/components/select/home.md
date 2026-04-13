# select下拉框组件

[https://element-plus.org/zh-CN/component/select.html](https://element-plus.org/zh-CN/component/select.html)

## Hidden Title {.md-hidden}

### 基础用法

:::demo 之所以, options为空, 加红色边框, 是为了减少不必要的点击后才知道数据为空的操作
select/base
:::

### 通常用法

:::demo
select/usually
:::

### 尺寸

:::demo
select/size
:::

### 多选--隐藏多余标签的多选

:::demo
select/multiple
:::

### 调用change方法

:::demo 主动调用select的change方法, 主要的使用场景是本地开发的时候, 给select加默认值
select/change
:::

### 遍历调用change方法

:::demo 主动调用select的change方法, 主要的使用场景是本地开发的时候, 给遍历的select加默认值
select/multyChange
:::

### 集成绝大部分属性和方法

:::demo
select/all
:::

### customLabel自定义显示label

:::demo
select/customLabel
:::

### 解析html

:::demo
select/html
:::

### 插槽

:::demo
select/slot
:::

### disabled, 设置选项不允许选择

:::demo
select/disabled
:::

### table单选

:::demo
select/simpleTableSelect
:::

### table多选

:::demo
select/multipleTableSelect
:::

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `modelValue` | 当前值 | array / string / number | - |
| `value` | 选项值字段名 | string | `value` |
| `label` | 选项显示字段名，支持字符串或多字段数组 | string / array | `label` |
| `options` | 选项数据 | array | `[]` |
| `type` | 数据类型，传 `simple` 时按基础类型数组处理 | string | `''` |
| `multiple` | 是否多选 | boolean | `false` |
| `showAll` | 多选时是否显示全选/反选 | boolean | `true` |
| `showPrefix` | 是否显示前缀数量信息 | boolean | `false` |
| `showQuick` | 是否显示上下快速切换按钮 | boolean | `true` |
| `title` | 左侧标题文案 | string | `''` |
| `connect` | 多字段 label 拼接符 | string | `/` |
| `customLabel` | 自定义 label 生成函数 | function / string | `''` |
| `width` | 组件宽度 | string / number | `''` |
| `disPlaceholder` | 禁用态占位文案 | string | `''` |
| `itemDisabled` | 单项禁用判断函数 | function | `() => {}` |
| `url` | 远程请求地址或方法 | string / function | `''` |
| `urlParams` | 远程请求参数 | object | `{}` |
| `optionsExpression` | 远程结果取值表达式 | string | `''` |
| `emptyColor` | 选项为空时是否高亮边框 | boolean | `false` |

### 事件

| 事件名 | 说明 |
| :----: | ---- |
| `update:modelValue` | 选中值变化时触发 |
| `change` | 值变化时触发 |
| `changeSelect` | 组件内部切换选项时触发 |

### 说明

- 组件基于 `el-select` 封装，绝大多数原生属性都可以直接透传。
- 多选模式下支持全选、反选和上下快速切换。
