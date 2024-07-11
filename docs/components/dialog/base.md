# dialog(弹出框)组件

https://element-plus.org/zh-CN/component/dialog.html

## 基础用法

:::demo
ODialog/base
:::

## 通常用法

:::demo
ODialog/usually
:::

## 插槽

:::demo
ODialog/slot
:::

---

## 属性

|    属性名    | 说明                 | 类型    | 默认值 |
| :----------: | -------------------- | ------- | ------ |
|    title     | 顶部title            | string  | 提示   |
|  cancelText  | 取消按钮文本         | string  | 取消   |
| confirmText  | 确认按钮文本         | string  | 确认   |
|    footer    | 是否显示底部操作按钮 | object  | -      |
|  showCancel  | 是否显示取消按钮     | boolean | true   |
| showConfirm  | 是否显示确认按钮     | boolean | true   |
| confirmAttrs | 确认按钮的属性       | object  | {}     |
| cancleAttrs  | 取消按钮的属性       | object  | {}     |
| destroy-on-close  | 当关闭 Dialog 时，销毁其中的元素       | boolean  | false     |

## 方法

| 属性名  | 说明           | 类型     |
| :-----: | -------------- | -------- |
| cancel  | 取消按钮的方法 | Function |
| confirm | 确认按钮的方法 | Function |

## Slots

| 插槽名 | 说明                                                   |
| :----: | ------------------------------------------------------ |
| header | 对话框标题的内容；会替换标题部分，但不会移除关闭按钮。 |
| footer | Dialog 按钮操作区的内容                                |
