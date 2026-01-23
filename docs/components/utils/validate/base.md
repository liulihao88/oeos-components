# validate用法

## Hidden Title {.md-hidden}

### 基础用法

:::demo
Utils/UValidate/base
:::

### 高阶用法

:::demo
Utils/UValidate/same
:::

### 不触发校验

:::demo validate只有提交的时候才触发校验, 将 `validate-on-rule-change`	是否在 rules 属性改变后立即触发一次验证(默认true, 设为`false`)
Utils/UValidate/noValid
:::

### 立刻触发校验

:::demo 很多时候, 我们希望在change和blur的时候, 直接触发校验. 这时候可以使用validateTrigger
Utils/UValidate/validateTrigger
:::