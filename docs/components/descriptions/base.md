# Descriptions 描述列表

[Element Plus 描述组件文档](https://element-plus.org/zh-CN/component/descriptions.html)

## Hidden Title {.md-hidden}

### 基础用法

:::demo
ODescriptions/base
:::

### 通常用法

:::demo
ODescriptions/usually
:::

### 每行展示多少项

:::demo
ODescriptions/column
:::

### 垂直列表

:::demo
ODescriptions/vertical
:::

### slot插槽

:::demo
ODescriptions/slot
:::

### 自定义样式

:::demo
ODescriptions/customStyle
:::

## 属性

|   属性名    | 说明                          | 类型     | 默认值 |
| :---------: | ----------------------------- | -------- | ------ |
|   options   | 选项                          | Array    | -      |
|   column    | 一行 Descriptions Item 的数量 | number   | 3      |
| label-width | label的宽度                   | string   | ''     |
| labelRender | label的render写法             | function | ''     |
|   render    | value的render写法             | function | ''     |
|    title    | 标题文本，显示在左上方        | string   | ''     |
|    extra    | 操作区文本，显示在右上方      | string   | ''     |
|   showAll   | 是否显示全部文本              | boolean  | false  |

## slot

|  插槽名   | 说明             |
| :-------: | ---------------- |
| labelSlot | 自定义label      |
| valueSlot | 自定义valuevalue |
