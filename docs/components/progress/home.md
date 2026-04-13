# progress进度条

[Element Plus Progress 组件文档](https://element-plus.org/zh-CN/component/progress.html)

## Hidden Title {.md-hidden}

<o-warning content="由于公司业务中值在不同百分比下, 会显示不同的颜色, 所以会对原有的<code>el-progress</code>样式颜色有影响, 如果想去掉影响, 可以设置`<code>customColor</code>属性为<code>false</code> "></o-warning>

### 基础用法

:::demo
progress/base
:::

### 其他用法

:::demo
progress/other
:::

### 自定义颜色

:::demo
progress/color
:::

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `percentage` | 进度百分比 | number | - |
| `animationTime` | 动画时长，单位毫秒 | number | `500` |
| `isAnimation` | 是否启用递增动画 | boolean | `true` |
| `customColor` | 是否按区间使用内置颜色 | boolean | `true` |

### 插槽

| 插槽名 | 说明 |
| :----: | ---- |
| `default` | 自定义进度条内容，可拿到 `percentage` |

### 说明

- 默认透传 `stroke-width="16"` 给 `el-progress`。
- 当未主动传 `color` 时，会根据百分比自动切换灰色、橙色、绿色。
