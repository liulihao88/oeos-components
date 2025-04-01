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

## 全屏

:::demo
ODialog/fullscreen
:::

## 弹框form表单

:::demo
ODialog/dialogForm
:::

## 自动给确认按钮加loading

dialog组件如果把@confirm换成:confirm, 那么子组件会优先处理属性confirm, 如果属性confirm是一个异步请求, 会加载loading

:::demo
ODialog/confirmLoading
:::

---

## 属性

|      属性名       | 说明                                                                                    | 类型     | 默认值 |
| :---------------: | --------------------------------------------------------------------------------------- | -------- | ------ |
|       title       | 顶部title                                                                               | string   | 提示   |
|    cancelText     | 取消按钮文本                                                                            | string   | 取消   |
|    confirmText    | 确认按钮文本                                                                            | string   | 确认   |
|      footer       | 是否显示底部操作按钮                                                                    | object   | -      |
|    showCancel     | 是否显示取消按钮                                                                        | boolean  | true   |
|    showConfirm    | 是否显示确认按钮                                                                        | boolean  | true   |
|   confirmAttrs    | 确认按钮的属性                                                                          | object   | {}     |
|    cancleAttrs    | 取消按钮的属性                                                                          | object   | {}     |
| destroy-on-close  | 当关闭 Dialog 时，销毁其中的元素                                                        | boolean  | false  |
|    fullscreen     | 是否为全屏Dialog                                                                        | boolean  | false  |
|   enableConfirm   | 是否允许使用enter回车键执行confirm事件                                                  | boolean  | true   |
| closeOnClickModal | 是否允许点击模态框关闭弹框                                                              | boolean  | true   |
|      confirm      | 绑定确认按钮的方法, 与方法的区别是, 可以使用属性绑定异步事件而直接让确认按钮加载loading | Function | -      |

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
