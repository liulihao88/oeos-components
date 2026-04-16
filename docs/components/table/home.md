# table组件

[https://element-plus.org/zh-CN/component/table.html](https://element-plus.org/zh-CN/component/table.html)

## Hidden Title {.md-hidden}

### all

:::demo
table/all
:::

### 基础用法

:::demo
table/base
:::

### other

:::demo
table/other
:::

### 单选

:::demo 基础单选，点击当前行进行选中
table/click/basic
:::

:::demo 通过 `v-model + row-key` 回显单选值
table/click/echo
:::

### 多级表头

:::demo
table/groupHeader
:::

### 多选

:::demo 基础多选
table/select/basic
:::

:::demo 通过 `v-model + row-key` 回显多选值
table/select/echo
:::

### 隐藏按钮或列 isShow

:::demo
table/isShow
:::

### 通常用法

:::demo
table/usually
:::

### 编辑

:::demo
table/edit
:::

### reConfirm再确认

:::demo
table/reConfirm
:::

### 表格里嵌套表格

:::demo
table/wrap
:::

### render生成html

:::demo
table/render
:::

### 改变操作按钮的属性

:::demo
table/operator
:::

### 对比

:::demo
table/compare
:::

### 属性

|      属性名       | 说明                                  | 类型    | 默认值         |
| :---------------: | ------------------------------------- | ------- | -------------- |
|      `data`       | 表格数据源                            | array   | `[]`           |
|     `columns`     | 列配置                                | array   | `[]`           |
|    `showPage`     | 是否显示分页                          | boolean | `true`         |
|    `showIndex`    | 是否显示序号列                        | boolean | `true`         |
|    `pageSize`     | 每页条数                              | number  | `30`           |
|   `pageNumber`    | 当前页码                              | number  | `1`            |
|    `pageSizes`    | 分页器可选每页条数                    | array   | `[10, 30, 50]` |
|      `total`      | 总条数，不传时默认取 `data.length`    | number  | -              |
| `columnEmptyText` | 单元格空值占位文案                    | string  | `-`            |
|     `loading`     | 表格加载状态                          | boolean | `false`        |
|   `indexAttrs`    | 序号列透传给 `el-table-column` 的配置 | object  | `{}`           |
|    `modelValue`   | 选中值；单选时为当前行，多选时为选中行数组 | any  | -              |
| `selectionType`   | 内置选中模式，支持 `single` / `multiple` | string | `''`          |
| `selectionAttrs`  | 内置单选列/多选列透传配置             | object  | `{}`           |
|   `asyncUpdate`   | 是否由外部异步控制分页状态            | boolean | `false`        |
|    `pageAttrs`    | 分页组件透传配置                      | object  | `{}`           |

### 事件

|  事件名  | 说明                     | 回调参数                 |
| :------: | ------------------------ | ------------------------ |
| `update` | 页码或每页条数变化时触发 | `(pageNumber, pageSize)` |
| `update:modelValue` | 内置单选/多选值变化时触发 | `(selectedRow \| selectedRows)` |

### columns 常用字段

|      字段名       | 说明                                               | 类型               |
| :---------------: | -------------------------------------------------- | ------------------ |
|      `label`      | 列标题                                             | string             |
|      `prop`       | 对应字段名                                         | string             |
|      `type`       | 特殊列类型，如 `selection` / `expand`              | string             |
|      `width`      | 列宽                                               | string / number    |
|      `fixed`      | 固定列                                             | string / boolean   |
|      `align`      | 对齐方式                                           | string             |
|     `useSlot`     | 使用插槽渲染，传 `true` 时默认插槽名为 `prop`      | boolean / string   |
|     `render`      | 自定义渲染函数                                     | function           |
|     `filter`      | 自定义文本处理                                     | function           |
|     `handler`     | 单元格点击事件                                     | function           |
|     `isShow`      | 控制列是否显示，支持布尔值或函数                   | boolean / function |
| `columnEmptyText` | 当前列的空值占位文案，会覆盖全局 `columnEmptyText` | string             |
|      `btns`       | 操作栏按钮配置，存在时该列作为操作列渲染           | array              |
|     `maxBtns`     | 操作栏最多显示的总数量，包含“更多”入口，默认 `4`  | number             |

### render 参数

`render` 统一接收一个对象参数：

```ts
render({ row, scope, value, column, action, index })
```

|  参数名  | 说明                                                               |
| :------: | ------------------------------------------------------------------ |
|  `row`   | 当前行数据                                                         |
| `scope`  | `el-table-column` 默认插槽作用域                                   |
| `value`  | 当前列 `prop` 对应的值；操作按钮未配置 `prop` 时可能为 `undefined` |
| `column` | 当前列配置对象                                                     |
| `action` | 当前操作按钮配置对象，仅操作栏下存在                               |
| `index`  | 当前行索引，对应 `scope.$index`                                    |

### 说明

- 组件底层基于 `el-table` 和 `el-pagination` 封装，未在上表列出的表格属性可继续通过 attrs 透传。
- 当 `asyncUpdate` 为 `true` 时，分页切换只触发 `update` 事件，由外部维护 `pageNumber` 和 `pageSize`。
- 操作栏 `maxBtns` 默认值为 `4`，表示总共最多显示 `4` 个槽位；当按钮数量超出时，会显示 `maxBtns - 1` 个按钮加一个“更多”入口。
- 单选推荐直接用 `v-model + selection-type="single"`；多选推荐直接用 `v-model + selection-type="multiple"`，如果要跨页保留选中项，记得传 `row-key`。
