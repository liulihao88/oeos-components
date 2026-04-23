# CompTitle 组件标题前缀

`o-comp-title` 是表单类组件左侧标题前缀，用来和 `o-input`、`o-select`、`o-input-number` 等输入控件拼接展示。单独使用时会保持和 Element Plus 输入框一致的高度。

## Hidden Title {.md-hidden}

### 基础用法

:::demo
compTitle/base
:::

### API

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `title` | 标题文案；为空时不渲染组件 | string | `''` |
| `boxStyle` | 标题容器样式，支持 `width` 并会经过 `processWidth` 处理 | object | `{}` |

### 透传属性

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `size` | 尺寸，跟随 Element Plus 输入框尺寸 | `large` / `default` / `small` | `default` |
| `class` | 自定义类名 | string / object / array | - |
| `style` | 自定义样式 | string / object / array | - |

### 说明

- `o-comp-title` 默认用于输入类组件的左侧标题区域。
- 默认高度为 `var(--el-component-size, 32px)`，`small` 为 `24px`，`large` 为 `40px`。
- 和输入框拼接时，通常需要把后面的输入框左侧圆角置为 `0`。
