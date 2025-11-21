# checkbox多选框组件

[https://element-plus.org/zh-CN/component/checkbox.html](https://element-plus.org/zh-CN/component/checkbox.html)

## Hidden Title {.md-hidden}

### 基础用法

:::demo 这是checkbox的最基础用法
OCheckbox/base
:::

### 通常用法

:::demo
OCheckbox/usually
:::

### 多属性用法

:::demo
OCheckbox/multyAttrs
:::

### 插槽用法

:::demo
OCheckbox/slot
:::

### 自定义间距

:::demo
OCheckbox/customGap
:::

### 属性

|     属性名     | 说明                                | 类型               | 默认值 |
| :------------: | ----------------------------------- | ------------------ | ------ |
|      type      | options参数的类型, 可以设置为simple | string             | -      |
|    options     | checkbox的选项                      | object             | {}     |
|    showType    | 显示的样式                          | string             | check  |
|     label      | 显示的文本对应的字段                | string             | label  |
|     value      | 后台的值需要的字段                  | string             | value  |
|    showAll     | 是否显示全选                        | boolean            | true   |
|     attrs      | 控制el-checkbox组件的参数           | object             | {}     |
| customDisabled | 自定义的disabled                    | function           | {} |
|  customLabel   | 自定义显示的label                   | function/string/'' |   {}     |
|  gap   |        多个复选框之间的水平间距            | number/string | -       |

## 方法

| 属性名 | 说明                           | 类型     |
| :----: | ------------------------------ | -------- |
| change | 值的改变可以通过change事件监听 | Function |

## Slots

| 插槽名  | 说明             |
| :-----: | ---------------- |
| default | 默认可以使用插槽 |
