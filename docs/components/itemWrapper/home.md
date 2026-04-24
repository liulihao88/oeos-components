# 包裹组件itemWrapper

## Hidden Title {.md-hidden}

### 基础用法

:::demo
itemWrapper/base
:::

### 更改间距大小 [gap]

:::demo
itemWrapper/gap
:::

### 一行显示几个 [columns]

:::demo
itemWrapper/columns
:::

### 显示在一行, 超出滚动

:::demo
itemWrapper/scroll
:::

### API

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `gap` | 子项之间的间距，内部会经过 `processWidth` 处理 | string / number | `16px` |
| `columns` | 每行展示的列数；不传时保持横向 flex 布局 | number | `null` |
| `minWidth` | 子项最小宽度 | number | `0` |

### 插槽

| 插槽名 | 说明 |
| :----: | ---- |
| `default` | 需要包裹的 `o-item` 或任意块级内容 |

### 说明

- 用于统一包裹多个 `item` 组件，支持设置间距、列数和滚动布局。
- 设置 `columns` 后会切换为 grid 等分布局；不设置时使用横向 flex，内容超出后可横向滚动。
- `gap` 支持 `16`、`'16'`、`'16px'`、`'5%'` 这类常见写法；纯数字或数字字符串会自动补成 `px`。
