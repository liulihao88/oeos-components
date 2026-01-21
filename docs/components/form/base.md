# form表单组件

[https://element-plus.org/zh-CN/component/form.html](https://element-plus.org/zh-CN/component/form.html)

## Hidden Title {.md-hidden}

### 基础用法

:::demo
OForm/base
:::

### 通常用法

:::demo
OForm/usually
:::

### 每行展示多少项

:::demo
OForm/column
:::

### 远程返回的表单数据

:::demo 直接在一个对象里, 处理默认数据和校验规则
OForm/remote
:::

### 自定义指令

:::demo 直接在一个对象里, 处理默认数据和校验规则
OForm/directives
:::

## 属性

|  属性名   | 说明        | 类型   | 默认值 |
| :-------: | ----------- | ------ | ------ |
| fieldList | fieldList值 | object | -      |
|   model   | model值     | object | -      |

## filedList属性

|   属性名    | 说明                  | 类型                 | 默认值    |
| :---------: | --------------------- | -------------------- | --------- |
|    label    | 左侧显示的label值     | string, slot, render | -         |
|    prop     | 值对应的属性          | string               | -         |
|    comp     | 要渲染的组件名称      | string               | 'o-input' |
|  formAttrs  | form绑定的属性        | object               | -         |
|    rules    | 每一项对应的rules规则 | object               | -         |
| labelRender | 对label的render渲染   | Function             | -         |
|  imgAttrs   | 左侧图片的属性        | object               | -         |
|   useSlot   | 使用插槽              | boolean              | -         |
| directives  | 自定义指令            | object               | -         |

## Form Exposes

|    名称     | 说明                 | 类型                                              |
| :---------: | -------------------- | ------------------------------------------------- |
|  validate   | 校验form表单是否通过 | Function(isResetFields = false, otherParams = {}) |
| resetFields | 重置form表单         | Function                                          |
