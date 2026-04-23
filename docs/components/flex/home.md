# Flex 弹性布局

`o-flex` 是一个轻量级 flex 容器组件，用来快速设置主轴方向、换行、对齐方式、间距，以及组件自身在父级 flex 容器中的伸缩规则。

参考：[Ant Design Vue Flex](https://antdv.com/components/flex-cn) / [MDN flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)

## Hidden Title {.md-hidden}

### 基础用法

:::demo
flex/base
:::

### 常用属性

:::demo
flex/usually
:::

### API

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
| :----: | ---- | ---- | ------ | ------ |
| `direction` | 主轴方向，对应 `flex-direction` | string | `row` / `row-reverse` / `column` / `column-reverse` | `row` |
| `wrap` | 是否换行，对应 `flex-wrap` | string | `nowrap` / `wrap` / `wrap-reverse` | `nowrap` |
| `justify` | 主轴对齐方式，对应 `justify-content` | string | `start` / `end` / `center` / `space-between` / `space-around` / `space-evenly` / `normal` | `normal` |
| `align` | 交叉轴对齐方式，对应 `align-items` | string | `start` / `end` / `center` / `baseline` / `stretch` / `normal` | `normal` |
| `gap` | 子元素间距，对应 `gap` | string / number | `small` / `default` / `large` / 任意可被 `processWidth` 处理的宽度 | `0px` |
| `flex` | 当前 `o-flex` 自身在父级 flex 容器中的伸缩规则，对应 CSS `flex` 简写 | string | 任意合法 CSS `flex` 值，如 `1`、`0 0 180px` | `''` |
| `component` | 自定义根节点标签或组件 | string / Component | 原生标签名或 Vue 组件 | `div` |

### Gap 预设

| 值 | 转换结果 |
| :--: | -------- |
| `small` | `8px` |
| `default` | `16px` |
| `large` | `24px` |
| number | 交给 `processWidth` 处理，通常转成 `px` |
| string | 交给 `processWidth` 处理，例如 `12px`、`1rem`、`50%` |

### 插槽

| 插槽名 | 说明 |
| :----: | ---- |
| `default` | flex 容器内部内容 |

### 说明

- `justify="normal"` 和 `align="normal"` 时不会输出对应 CSS 属性，由浏览器默认行为决定。
- `flex` 控制的是 `o-flex` 自身在父级 flex 容器里的伸缩，不是控制子项。
- `component` 可以传原生标签，例如 `component="section"`，也可以传 Vue 组件对象。
