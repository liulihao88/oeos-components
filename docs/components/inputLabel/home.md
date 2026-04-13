# inputLabel标签输入组件

## Hidden Title {.md-hidden}

### 基础用法

:::demo
inputLabel/base
:::

### 通常用法

:::demo 可以在输入的时候做一些输入规则的校验
inputLabel/usually
:::

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `modelValue` | 标签数组值 | array | `[]` |
| `isComplex` | 是否按对象数组处理，开启后默认写入 `{ name }` 结构 | boolean | `false` |
| `regexp` | 输入校验正则 | RegExp | - |
| `message` | 校验失败提示文案 | string | `输入有误` |
| `inputAttrs` | 透传给内部 `o-input` 的属性 | object | `{}` |

### Exposes

| 名称 | 说明 | 类型 |
| :--: | ---- | ---- |
| `$getValue` | 获取当前标签数组 | function |

### 说明

- 支持回车和失焦时新增标签。
- 重复值不会重复添加，校验失败会通过 `$toast` 提示。
