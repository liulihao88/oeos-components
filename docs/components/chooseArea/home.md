# chooseArea组件(选择省市区)

## Hidden Title {.md-hidden}

### 基础用法

:::demo
chooseArea/base
:::

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `width` | 选择器宽度 | string / number | `''` |

### 说明

- 组件底层基于 `el-cascader` 封装，默认内置省市区数据。
- 未声明的属性会继续透传给 `el-cascader`，例如 `clearable`、`filterable`、`disabled` 等。
