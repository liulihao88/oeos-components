# icon图标

## Hidden Title {.md-hidden}

[Element Plus Icon Documentation](https://element-plus.org/zh-CN/component/icon.html)

### 基础用法

:::demo
icon/base
:::

### 插槽

:::demo
icon/slot
:::

### 常用图标查找

:::demo
icon/usually
:::

### 所有图标

:::demo
icon/all
:::

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `name` | 图标名称 | string | - |
| `color` | 图标颜色 | string | - |
| `size` | 图标尺寸 | string / number | `16px` |
| `disabled` | 是否禁用，禁用后不会触发点击 | boolean | `false` |
| `type` | 图标类型，传 `svg` 时走 `o-svg` 渲染 | string | `''` |
| `svgAttrs` | 透传给 `o-svg` 的属性 | object | `{}` |

### 事件

| 事件名 | 说明 | 回调参数 |
| :----: | ---- | -------- |
| `click` | 点击图标时触发 | `event` |

### 说明

- 组件底层使用 `el-icon`，tooltip 相关属性如 `content`、`placement`、`effect` 可直接透传。
