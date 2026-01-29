# chart图表组件

[https://echarts.apache.org/handbook/zh/get-started](https://echarts.apache.org/handbook/zh/get-started)

## Hidden Title {.md-hidden}

### 基础用法

:::demo 这是chart的最基础用法
chart/base
:::

### 折线图

:::demo
chart/line
:::

### 柱状图

:::demo
chart/bar
:::

### 饼图

:::demo
chart/pie
:::

### 主题切换

:::demo
chart/theme
:::

### 空状态

:::demo 设置 isEmpty=true，即可显示空状态
chart/empty
:::

### 插槽

:::demo
chart/slot
:::

### dataset 数据集

:::demo
chart/dataset
:::

### 多种情况

:::demo 多种chart图
chart/multiple
:::

### 属性

| 属性名 | 说明                   | 类型           | 默认值 |
| :----: | ---------------------- | -------------- | ------ |
| option | 指定图表的配置项和数据 | Object         | {}     |
| height | 图表高度               | `processWidth` | 400px  |
| width  | 图表宽度               | `processWidth` | 100%   |

### Exposes

|   属性名    | 说明                    | 类型     |
| :---------: | ----------------------- | -------- |
|  initChart  | 调用echarts的init方法   | function |
| resizeChart | 调用echarts的resize方法 | function |
