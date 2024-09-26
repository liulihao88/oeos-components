# dialog(弹出框)组件

https://element-plus.org/zh-CN/component/description.html

## 基础用法

:::demo
ODescription/base
:::

## 通常用法

:::demo
ODescription/usually
:::

## 属性

|   属性名    | 说明                          | 类型   | 默认值 |
| :---------: | ----------------------------- | ------ | ------ |
|   options   | 选项                          | Array  | -      |
|   column    | 一行 Descriptions Item 的数量 | number | 3      |
| label-width | label的宽度                   | string | ''     |
|    title    | 标题文本，显示在左上方        | string | ''     |
|    extra    | 操作区文本，显示在右上方      | string | ''     |

## 方法

|    属性名    | 说明                           | 类型                         |
| :----------: | ------------------------------ | ---------------------------- |
| changeSelect | 值的改变可以通过change事件监听 | Function(value, label, item) |
