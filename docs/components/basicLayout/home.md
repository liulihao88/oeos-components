# 布局组件

## Hidden Title {.md-hidden}

### 基础用法

:::demo
basicLayout/base
:::

### 展开和收缩

:::demo
basicLayout/callapse
:::

### other

:::demo
basicLayout/other
:::

### 自适应高度

:::demo
basicLayout/customLayout
:::

### slot插槽

:::demo
basicLayout/slot
:::

### body正方形

:::demo
basicLayout/square
:::

### API

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `v-model` / `modelValue` | 折叠状态，`true` 表示收起 | boolean | `false` |
| `size` | 内边距尺寸 | `small` / `default` / `large` | `default` |
| `title` | 默认头部标题，传入后会使用 `o-title` 渲染 | string | `''` |
| `boxStyle` | 传给默认 `o-title` 的样式 | object | `{}` |
| `headerStyle` | 头部区域样式 | object | `{}` |
| `bodyStyle` | 内容区域样式 | object | `{}` |
| `footerStyle` | 底部区域样式 | object | `{}` |
| `border` | 是否显示头部下边框 | boolean | `true` |
| `clearBrBottom` | 清除底部圆角 | boolean | `false` |
| `clearBrTop` | 清除顶部圆角 | boolean | `false` |
| `clearBr` | 清除全部圆角 | boolean | `false` |
| `scroll` | 内容区是否自动撑开并滚动 | boolean | `true` |
| `square` | 内容区按宽高最大值渲染为正方形 | boolean | `false` |
| `collapsible` | 是否允许点击头部展开/收起 | boolean | `false` |

### 事件

| 事件名 | 说明 | 回调参数 |
| :----: | ---- | -------- |
| `update:modelValue` | 折叠状态变化时触发 | `(collapsed: boolean)` |

### 插槽

| 插槽名 | 说明 |
| :----: | ---- |
| `default` | 内容区域 |
| `header` | 自定义头部，会覆盖默认 `title` |
| `icon` | 自定义折叠图标 |
| `footer` | 底部区域 |

### 说明

- 用于构建业务卡片式基础布局，支持展开收起、插槽、自适应高度等常见场景。
- 只有设置 `collapsible` 后，点击头部才会切换折叠状态。
- `scroll` 为 `true` 时内容区会设置 `flex: 1` 和 `overflow: auto`，适合放在固定高度容器中。
