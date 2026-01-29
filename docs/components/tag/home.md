# tag组件

[Element Plus Tag Documentation](https://element-plus.org/zh-CN/component/tag.html)

## Hidden Title {.md-hidden}

### 基础用法

:::demo
tag/base
:::

### 通常用法

:::demo
tag/usually
:::

### company(公司常用数据)

[
{
name: '未知',
value: 'Unknown',
},
{
name: '正常',
value: 'Normal',
},
]

:::demo
tag/company
:::

### map数据

:::demo
tag/map
:::

### Slots

:::demo
tag/slot
:::

### async

:::demo
tag/async
:::

### 属性

|            属性名             | 说明                         | 类型                | 默认值  |
| :---------------------------: | ---------------------------- | ------------------- | ------- |
|             type              | 绑定值                      | string/number       | -       |
|             value             |                              | string              | -       |
|             other             | 如果都匹配不到显示的type类型 | string              | primary |
| `primary/info/warning/danger` | 不同类型匹配到的数组或字符串 | string/number/array | -       |
|             width             | 宽度                         | string/number/array | -       |
|            height             | 高度                         | string/number/array | -       |
|            config             | 相关配置                         | object<label/value> | -       |

### 颜色使用原则

|  淡蓝色(primary)   | 橙色(warning)                         | 红色(danger)    | 灰色(info)       |
| :----------------: | ------------------------------------- | --------------- | ---------------- |
| 消息/运行中/已激活 | 警告/紧张/停止中/启动中/激活中/停服中 | 错误/问题/ISSUE | 未知/停止/未激活 |
