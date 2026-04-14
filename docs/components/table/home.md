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

### 单击选中当前行

:::demo
table/click
:::

### 多选

:::demo
table/select
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

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `data` | 表格数据源 | array | `[]` |
| `columns` | 列配置 | array | `[]` |
| `showPage` | 是否显示分页 | boolean | `true` |
| `showIndex` | 是否显示序号列 | boolean | `true` |
| `pageSize` | 每页条数 | number | `30` |
| `pageNumber` | 当前页码 | number | `1` |
| `pageSizes` | 分页器可选每页条数 | array | `[10, 30, 50]` |
| `total` | 总条数，不传时默认取 `data.length` | number | - |
| `columnEmptyText` | 单元格空值占位文案 | string | `-` |
| `loading` | 表格加载状态 | boolean | `false` |
| `indexAttrs` | 序号列透传给 `el-table-column` 的配置 | object | `{}` |
| `asyncUpdate` | 是否由外部异步控制分页状态 | boolean | `false` |
| `pageAttrs` | 分页组件透传配置 | object | `{}` |

### 事件

| 事件名 | 说明 | 回调参数 |
| :----: | ---- | -------- |
| `update` | 页码或每页条数变化时触发 | `(pageNumber, pageSize)` |

### columns 常用字段

| 字段名 | 说明 | 类型 |
| :----: | ---- | ---- |
| `label` | 列标题 | string |
| `prop` | 对应字段名 | string |
| `type` | 特殊列类型，如 `selection` / `expand` | string |
| `width` | 列宽 | string / number |
| `fixed` | 固定列 | string / boolean |
| `align` | 对齐方式 | string |
| `useSlot` | 使用插槽渲染，传 `true` 时默认插槽名为 `prop` | boolean / string |
| `render` | 自定义渲染函数 | function |
| `filter` | 自定义文本处理 | function |
| `handler` | 单元格点击事件 | function |
| `isShow` | 控制列是否显示，支持布尔值或函数 | boolean / function |
| `columnEmptyText` | 当前列的空值占位文案，会覆盖全局 `columnEmptyText` | string |
| `btns` | 操作栏按钮配置，存在时该列作为操作列渲染 | array |
| `maxBtns` | 操作栏最多直接展示的按钮数，超出后收进更多菜单 | number |

### render 参数

`render` 统一接收一个对象参数：

```ts
render({ row, scope, value, column, action, index })
```

| 参数名 | 说明 |
| :----: | ---- |
| `row` | 当前行数据 |
| `scope` | `el-table-column` 默认插槽作用域 |
| `value` | 当前列 `prop` 对应的值；操作按钮未配置 `prop` 时可能为 `undefined` |
| `column` | 当前列配置对象 |
| `action` | 当前操作按钮配置对象，仅操作栏下存在 |
| `index` | 当前行索引，对应 `scope.$index` |

### 说明

- 组件底层基于 `el-table` 和 `el-pagination` 封装，未在上表列出的表格属性可继续通过 attrs 透传。
- 当 `asyncUpdate` 为 `true` 时，分页切换只触发 `update` 事件，由外部维护 `pageNumber` 和 `pageSize`。
