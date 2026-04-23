# FunctionSourceCode 函数源码展示

`o-function-source-code` 用于在文档中展示 `@oeos-components/utils` 中指定函数的源码，常用于工具函数文档页。

## Hidden Title {.md-hidden}

### 基础用法

:::demo
functionSourceCode/base
:::

### API

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `functionName` | 需要展示源码的工具函数名称 | string | `uuid` |

### 说明

- 组件会动态导入 `@/utils/src/index.ts`，并按 `functionName` 查找对应导出。
- 如果函数不存在，会展示“未能找到函数”的提示。
- 该组件主要服务于文档站，不建议作为业务页面组件使用。
