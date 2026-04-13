# radio 单选组件

[Element Plus Radio 组件文档](https://element-plus.org/zh-CN/component/radio.html)

## Hidden Title {.md-hidden}

### 基础用法

:::demo 基于 Element-plus 的 `el-radio` 二次封装的**单选组件**，继承原组件的所有属性
radio/base
:::

### disabled

:::demo 基于 Element-plus 的 `el-radio` 二次封装的**单选组件**，继承原组件的所有属性
radio/disabled
:::

### 通常用法

:::demo
radio/usually
:::

### 使用type

:::demo 这里更改了type属性, 可以有很多种自定义options的变换, 属于自定义的扩展
radio/type
:::

### 多个属性的用法

:::demo
radio/multyAttrs
:::

### Slots

:::demo
radio/slot
:::

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `title` | 左侧标题文案 | string | - |
| `type` | 数据类型，支持 `''` / `simple` / `boolean` | string | `''` |
| `showType` | 展示形式，支持 `radio` / `button` | string | `radio` |
| `options` | 单选项列表 | array | `[]` |
| `border` | 是否显示边框 | boolean | `false` |
| `value` | 选项值字段名 | string / number / boolean | `value` |
| `label` | 选项展示字段名 | string / number / boolean | `label` |
| `itemDisabled` | 单项禁用判断函数 | function | `() => {}` |

### 说明

- 组件底层基于 `el-radio-group` 封装，支持透传原生属性和事件。
- `type="simple"` 时会把基础类型数组自动转换为 `{ label, value }`。
- `type="boolean"` 时会自动生成 `true / false` 两个选项。
