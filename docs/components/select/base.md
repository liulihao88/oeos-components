# select下拉框组件

https://element-plus.org/zh-CN/component/select.html

## 基础用法

:::demo 之所以, options为空, 加红色边框, 是为了减少不必要的点击后才知道数据为空的操作
OSelect/base
:::

### 通常用法

:::demo
OSelect/usually
:::

### 多选

:::demo
OSelect/multiple
:::

### 调用change方法

:::demo 主动调用select的change方法, 主要的使用场景是本地开发的时候, 给select加默认值
OSelect/change
:::

### 遍历调用change方法

:::demo 主动调用select的change方法, 主要的使用场景是本地开发的时候, 给遍历的select加默认值
OSelect/multyChange
:::

### 集成绝大部分属性和方法

:::demo
OSelect/all
:::

## 属性

|     属性名     | 说明                          | 类型           | 默认值 |
| :------------: | ----------------------------- | -------------- | ------ |
|     value      | 作为 value 唯一标识的键名     | string         | value  |
|     label      | 显示在页面上的属性值          | string         | label  |
|    options     | 下拉选项                      | array          | -      |
|      type      | 显示的类型                    | string(simple) | -      |
|    multiple    | 是否多选                      | boolean        | false  |
|     title      | 左侧的文本                    | string         | ''     |
|     width      | 宽度                          | string/nunber  | ''     |
|  customLabel   | 自定义lablel                  | function       | ''     |
| disPlaceholder | disable下的placeholder        | string         | ''     |
| optionDisabled | 判断哪些items是disabled的回调 | function       | -      |
|   emptyColor   | 是否显示空options下的颜色     | boolean        | true   |

## 方法

|    属性名    | 说明                           | 类型                         |
| :----------: | ------------------------------ | ---------------------------- |
| changeSelect | 值的改变可以通过change事件监听 | Function(value, label, item) |
