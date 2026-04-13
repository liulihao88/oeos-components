# 文本组件

## Hidden Title {.md-hidden}

### 基础用法

:::demo
text/base
:::

### 通常用法

:::demo
text/usually
:::

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `lineClamp` | 多行省略行数，不传时按单行省略处理 | string / number | - |
| `tippyProps` | 透传给 `vue-tippy` 的配置 | object | `{}` |

### 插槽

| 插槽名 | 说明 |
| :----: | ---- |
| `default` | 默认文本内容 |
| `content` | tooltip 自定义内容，未提供时默认使用文本内容 |

### 说明

- 文本溢出时才会启用 tooltip，未溢出时自动禁用。
- 底层展示基于 `el-text`，tooltip 能力基于 `vue-tippy`。
