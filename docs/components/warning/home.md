# warning警告组件

## Hidden Title {.md-hidden}

### 基础用法

:::demo 这是warning的最基础用法
warning/base
:::

### 插槽

:::demo 插槽
warning/slot
:::

### 属性

|     属性名     | 说明                                | 类型            | 默认值 |
| :------------: | ----------------------------------- | --------------- | ------ |
|      title      | 标题内容 | string | `''` |
|      type      | 提示类型，支持 `info/simple/warning/error` | string | `info` |
|    content     | 显示的正文内容 | string | - |
|    width     | 宽度 | string / number | `100%` |
| dangerouslyUseHTMLString | 是否将 `content` 作为 HTML 片段处理 | boolean | `true` |
| icon | 是否显示图标 | boolean | `true` |
| size | 组件尺寸，支持 `small/default` | string | `default` |
| dotted | 是否使用虚线边框 | boolean | `false` |
| customStyle | 自定义样式对象 | object | `{}` |
| iconAttrs | 图标额外属性 | object | `{}` |
| left | 左侧额外间距，传 `true` 时默认 `8px` | boolean / string / number | `false` |

### Slots

| 插槽名  | 说明             |
| :-----: | ---------------- |
| default | 默认正文内容 |
| title | 自定义标题内容 |
| content | 自定义正文内容 |
