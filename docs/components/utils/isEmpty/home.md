# isEmpty判断是否是空值

## Hidden Title {.md-hidden}

### 基础用法

:::demo
utils/isEmpty/base
:::

### 说明

- `isEmpty` 用于判断常见空值场景，如 `null`、`undefined`、空字符串、空数组等。
- 默认不会把 `0`、`false`、`BigInt(0)` 当成空值。
- 如果需要兼容旧语义，可以显式传第二个参数 `false`。
