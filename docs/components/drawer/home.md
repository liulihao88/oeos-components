# drawer组件

[Element Plus Drawer 文档](https://element-plus.org/zh-CN/component/drawer.html)

<el-tag type="danger">
由于drawer和dialog的api和用法几乎一致, 所以当前drawer组件将不再维护, 如果想使用drawer抽屉组件, 可以直接使用&lt;o-warning type="drawer" /&gt;
</el-tag>

## Hidden Title {.md-hidden}

### 基础用法

:::demo
drawer/base
:::

### 通常用法

:::demo
drawer/usually
:::

### API

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `v-model` / `modelValue` | 是否显示抽屉，透传给 `el-drawer` | boolean | - |
| `confirmText` | 确认按钮文字 | string | `提交` |
| `cancelText` | 取消按钮文字 | string | `取消` |
| `showFooter` | 是否显示底部操作区 | boolean | `true` |
| `showConfirm` | 是否显示确认按钮 | boolean | `true` |
| `showCancel` | 是否显示取消按钮 | boolean | `true` |
| `wrapperClosable` | 是否允许点击遮罩关闭 | boolean | `true` |
| `confirmAttrs` | 透传给确认按钮的属性 | object | `{}` |
| `cancelAttrs` | 透传给取消按钮的属性 | object | `{}` |
| `type` | 抽屉预设类型；`detail` 会使用详情抽屉默认配置 | `''` / `detail` | `''` |
| `detailAttrs` | `type="detail"` 时合并的抽屉配置 | object | `{}` |

### 事件

| 事件名 | 说明 | 回调参数 |
| :----: | ---- | -------- |
| `update:modelValue` | 关闭抽屉时触发 | `(visible: false)` |
| `confirm` | 点击确认按钮时触发；未传入时默认关闭抽屉 | - |
| `cancel` | 点击取消按钮时触发；未传入时默认关闭抽屉 | - |

### 插槽

| 插槽名 | 说明 |
| :----: | ---- |
| `default` | 抽屉内容 |
| `header` | 自定义头部 |
| `footer` | 自定义底部操作区 |

### 透传属性

- 除上述属性外，其余属性会透传给 Element Plus `el-drawer`。

### 说明

- 当前 `drawer` 组件已不再继续维护，推荐优先使用 `dialog` 组件或 `o-warning type="drawer"` 进行替代提示。
- 现有示例主要用于兼容旧项目，如需新增能力，建议直接在 `dialog` 组件侧扩展。
