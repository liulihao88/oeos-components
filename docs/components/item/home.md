# item列表组件

## Hidden Title {.md-hidden}

### 基础用法

:::demo
item/base
:::

### 包裹用法

:::demo
item/wrapper
:::

### 样式

:::demo
item/style
:::

### 不同类型

:::demo
item/type
:::

### API

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `src` | 图片地址；为空且未传 `img` 插槽时不展示图片区域 | string | `''` |
| `label` | 标签文本 | string / number | - |
| `value` | 数值内容 | string / number | - |
| `width` | 组件宽度，会经过 `processWidth` 处理 | string / number | `''` |
| `height` | 组件高度，会经过 `processWidth` 处理 | string / number | `''` |
| `labelStyle` | 标签区域样式 | object | `{}` |
| `valueStyle` | 数值区域样式 | object | `{}` |
| `itemStyle` | 右侧内容容器样式 | object | `{}` |
| `imgStyle` | 图片区域样式 | object | `{}` |
| `boxStyle` | 最外层容器样式 | object | `{}` |
| `type` | 展示类型，`value` 表示数值优先布局 | `''` / `value` | `''` |
| `attrs` | 扩展配置 | object | `{}` |

### attrs 扩展配置

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `formatBytes` | 是否按字节大小格式化 `value` | boolean | - |
| `toFixed` | 是否格式化小数位；传 `true` 默认为 2 位，也可传数字 | boolean / number | - |
| `formatThousands` | 是否对 `value` 做千分位格式化 | boolean | - |
| `center` | `type="value"` 时内容是否居中 | boolean | - |

### 插槽

| 插槽名 | 说明 |
| :----: | ---- |
| `img` | 自定义图片区域 |
| `label` | 自定义标签内容 |
| `value` | 自定义数值内容 |

### 说明

- 用于展示单条业务信息项，支持包裹布局、样式切换和不同展示类型。
- `label` 和 `value` 是必填属性，如果需要完全自定义内容，也建议保留基础值作为兜底。
