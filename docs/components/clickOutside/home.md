# clickOutside外部点击事件组件

## Hidden Title {.md-hidden}

### 基础用法

:::demo
clickOutside/base
:::

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `options` | 透传给 `onClickOutside` 的配置项 | object | `{}` |

### 事件

| 事件名 | 说明 | 回调参数 |
| :----: | ---- | -------- |
| `clickOutside` | 点击组件外部区域时触发 | `options` |
| `mounted` | 组件挂载完成时触发 | `wrapRef` |

### 插槽

| 插槽名 | 说明 |
| :----: | ---- |
| `default` | 被监听的内容区域 |
