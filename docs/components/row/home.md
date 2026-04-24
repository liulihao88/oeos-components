# row 布局组件

[https://element-plus.org/zh-CN/component/layout.html](https://element-plus.org/zh-CN/component/layout.html)

## Hidden Title {.md-hidden}

### 基础用法

:::demo
row/base
:::

### gutter 间距

:::demo `gutter`
row/gutter
:::

### gap 间距

:::demo `gap`
row/gap
:::

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `col` | 自动包裹为 `el-col` 时的栅格值，也可传数组按顺序指定 | number / number[] | `24` |
| `gap` | 与 `gutter` 效果一致的间距属性，支持 `processWidth` 写法 | number / string | `''` |
| `gutter` | 栅格间隔；未传 `gap` 时生效 | number / string | `0` |
| `justify` | 主轴对齐方式 | `start` / `end` / `center` / `space-around` / `space-between` | `start` |
| `align` | 交叉轴对齐方式 | `top` / `middle` / `bottom` | `top` |
| `colAttrs` | 自动生成的 `el-col` 额外属性 | object | `{}` |

### 说明

- 插槽子节点如果本身就是 `el-col`，会直接渲染。
- 其他节点会自动包裹一层 `el-col`，适合快速搭布局。
- `gap` 和 `gutter` 的布局效果一致；如果两个同时传入，组件会优先使用 `gap`。
- `gap` 支持 `16`、`'16'`、`'16px'`、`'1rem'`、`'5%'` 等 `processWidth` 风格写法。
- 数字和 `px` 会优先走 Element Plus 原生 `gutter`，其他单位会退回为组件内部样式实现。
