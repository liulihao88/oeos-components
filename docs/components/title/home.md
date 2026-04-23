# title组件

## Hidden Title {.md-hidden}

### 基础用法

:::demo
title/base
:::

### 通常用法

:::demo
title/usually
:::

### compTitle组件的使用

:::demo
title/compTitle
:::

`compTitle` 也可以作为独立组件使用，完整文档见 [CompTitle 组件标题前缀](/components/compTitle/home.md)。

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `title` | 主标题文案 | string | `''` |
| `size` | 尺寸标识，保留字段 | string | `''` |
| `subTitle` | 副标题文案 | string | `''` |
| `subAttrs` | 副标题额外属性 | object | `{}` |
| `inner` | 是否使用内部缩进 | boolean | `false` |
| `t` | 上边距 | string / number | `''` |
| `b` | 下边距 | string / number | `''` |
| `l` | 左边距 | string / number | `''` |
| `tb` | 同时设置上下边距 | string / number | - |
| `height` | 组件高度 | string / number | `''` |
| `type` | 标题样式类型，支持 `icon` / `simple` / `form` | string | `icon` |

### 插槽

| 插槽名 | 说明 |
| :----: | ---- |
| `title` | 自定义标题内容 |
| `icon` | 自定义左侧图标 |
| `right` | 右侧操作区 |
| `default` | 标题后追加内容 |
