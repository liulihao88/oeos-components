# chart图表组件

[https://echarts.apache.org/handbook/zh/get-started](https://echarts.apache.org/handbook/zh/get-started)

## Hidden Title {.md-hidden}

### 基础用法

:::demo 这是chart的最基础用法
OChart/base
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
