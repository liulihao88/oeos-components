# popconfirm组件

[Element Plus Popover 组件文档](https://element-plus.org/zh-CN/component/popover.html)

## Hidden Title {.md-hidden}

### 基础用法

:::demo
popconfirm/base
:::

### 通常用法

:::demo
popconfirm/usually
:::

### Slots

:::demo
popconfirm/slot
:::

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `title` | 标题文案 | string | `确定删除吗?` |
| `width` | 弹层宽度 | string / number | `200` |
| `content` | 正文内容 | string | - |
| `reConfirm` | 是否启用二次确认，关闭后点击即直接确认 | boolean | `true` |

### 事件

| 事件名 | 说明 |
| :----: | ---- |
| `confirm` | 点击确认时触发 |
| `cancel` | 点击取消时触发 |

### 插槽

| 插槽名 | 说明 |
| :----: | ---- |
| `default` | 触发器内容 |
| `content` | 自定义正文内容 |
| `footer` | 自定义底部操作区 |

### Exposes

| 名称 | 说明 | 类型 |
| :--: | ---- | ---- |
| `close` | 手动关闭弹层 | function |
