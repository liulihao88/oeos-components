# input输入框组件

[Element Plus 输入框组件文档](https://element-plus.org/zh-CN/component/input.html)

## Hidden Title {.md-hidden}

### 基础用法

:::demo
input/base
:::

### other

:::demo
input/other
:::

### Modifiers

<el-tag>注意</el-tag> : o-input默认设置`trim`为true, 去掉首尾空格. 如果不想要这个设置, 请设置`trim`为false
:::demo
input/modifiers
:::

### 禁用状态

:::demo
input/disabled
:::

### 一键清空

使用`clearable`属性即可得到一个可一键清空的输入框, `o-input`默认clearable是`true`的.

:::demo
input/clearable
:::

### 格式化

:::demo
input/formatter
:::

### 通常用法

:::demo
input/usually
:::

### 复合型输入框

:::demo
input/slot
:::

### 封装el-autocomplete的用法

:::demo
input/autocomplete
:::

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `modelValue` | 绑定值 | any | - |
| `boxStyle` | 标题前缀区域样式 | object | `{}` |
| `width` | 输入框宽度 | string / number | `100%` |
| `showWordLimit` | 是否显示字数统计 | boolean / string | `''` |
| `block` | 是否按块级宽度展示 | boolean | `false` |
| `disPlaceholder` | 禁用态下显示的占位文案 | string | `''` |
| `subAttrs` | 外层容器额外属性 | object | `{}` |
| `tooltipAttrs` | tooltip 额外属性 | object | `{}` |
| `iconAttrs` | 右侧提示图标属性 | object | `{}` |
| `hideTooltip` | 是否关闭溢出提示 | boolean | `false` |
| `options` | 自动补全候选项，存在时渲染为 `el-autocomplete` | array | - |
| `content` | 右侧说明提示文案 | string | `''` |

### 说明

- 默认基于 `el-input` 二次封装，并透传绝大多数 `el-input` 属性。
- 当传入 `options` 时会切换为 `el-autocomplete` 模式。
