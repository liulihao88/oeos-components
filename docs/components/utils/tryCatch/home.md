# tryCatch方法

## Hidden Title {.md-hidden}

### 基础用法

:::demo
utils/tryCatch/base
:::

### 说明

- `tryCatch` 用于统一处理同步 `throw` 和异步 `reject`，返回固定的 `{ data, error }` 结构。
- 推荐优先使用 `tryCatch(() => task(), loading)` 这种写法，这样函数内部的同步报错也能一起接住。
- 如果已经拿到一个 Promise，也可以直接写 `tryCatch(promise)`。
