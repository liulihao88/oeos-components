# switch切换组件

[https://element-plus.org/zh-CN/component/switch.html](https://element-plus.org/zh-CN/component/switch.html)

## Hidden Title {.md-hidden}

### 基础用法

:::demo 这是switch的最基础用法
switch/base
:::

### 属性

|    属性名     | 说明                                                                         | 类型               | 默认值 |
| :--------: | ---------------------------------------------------------------------------- | ------------------ | ------ |
|  active-text  | switch 打开时的文字描述                                                      | string             | ''     |
| inactive-text | switch 的状态为 off 时的文字描述                                             | string             | ''     |
| before-change | switch 状态改变前的钩子， 返回 `false` 或者返回 `Promise` 且被 reject 则停止切换 | boolean / Function | -      |

### 方法

| 属性名 | 说明                            | 类型     |
| :----: | ------------------------------- | -------- |
| change | switch 状态发生变化时的回调函数 | Function |
