# row 布局组件

[https://element-plus.org/zh-CN/component/layout.html](https://element-plus.org/zh-CN/component/layout.html)

## Hidden Title {.md-hidden}

### 基础用法

:::demo
row/base
:::

### 测试插槽响应式

:::demo
row/testSlot
:::

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `col` | 自动包裹为 `el-col` 时的栅格值，也可传数组按顺序指定 | number / number[] | `24` |
| `gutter` | 栅格间隔，支持数字、数字字符串和常见 CSS 单位 | number / string | `0` |
| `justify` | 主轴对齐方式 | string | `start` |
| `align` | 交叉轴对齐方式 | string | `top` |
| `colAttrs` | 自动生成的 `el-col` 额外属性 | object | `{}` |

### 说明

- 插槽子节点如果本身就是 `el-col`，会直接渲染。
- 其他节点会自动包裹一层 `el-col`，适合快速搭布局。
- `gutter` 支持 `16`、`'16'`、`'16px'`、`'1rem'`、`'5%'` 等写法；数字和 `px` 会优先走 Element Plus 原生 `gutter`，其他单位会退回为组件内部样式实现。
