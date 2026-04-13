# dateRange组件(选择开始和结束日期)

[Element Plus 日期选择器文档](https://element-plus.org/zh-CN/component/el-date-picker.html)

## Hidden Title {.md-hidden}

### 基础用法

:::demo `继承el-date-pickter所有属性`
dateRange/base
:::

### 通常用法

:::demo `继承el-date-picker所有属性`
dateRange/usually
:::

### 选择7天以内的日期

:::demo `继承el-date-picker所有属性`
dateRange/range
:::

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `title` | 左侧标题文案 | string | `''` |
| `width` | 组件整体宽度 | string / number | `300px` |

### 默认行为

- 默认透传给 `el-date-picker`：`type="daterange"`、`value-format="YYYY-MM-DD HH:mm:ss"`。
- 当 `type !== 'datetime'` 时默认 `format` 为 `YYYY-MM-DD`，`datetime` 模式下默认 `format` 为 `YYYY-MM-DD HH:mm:ss`。
- 组件内置今天、昨天、最近 7 天、本周、上周、本月、上月等快捷项。
