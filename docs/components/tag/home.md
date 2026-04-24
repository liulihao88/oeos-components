# Tag 标签组件

`o-tag` 基于 Element Plus `el-tag` 封装，支持直接指定标签类型，也支持根据值自动映射标签文案和颜色。适合状态展示、枚举值翻译、表格状态列等场景。

[Element Plus Tag Documentation](https://element-plus.org/zh-CN/component/tag.html)

## Hidden Title {.md-hidden}

### 基础用法

:::demo
tag/base
:::

### 值匹配着色

:::demo
tag/usually
:::

### options + config 配置

:::demo
tag/company
:::

### 分组映射数据

:::demo
tag/map
:::

### 插槽内容

:::demo
tag/slot
:::

### 动态切换

:::demo
tag/async
:::

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `value` | 当前值；未传默认插槽时会作为标签内容或映射源 | string / number | - |
| `type` | 直接指定标签类型 | `primary` / `success` / `info` / `warning` / `danger` | - |
| `options` | 映射数据源，支持“平铺数组 + config”和“分组映射数组”两种写法 | array | `[]` |
| `config` | 平铺数组模式下的字段映射配置 | `{ label?: string, value?: string }` | `{}` |
| `primary` | 匹配为主色标签的规则 | boolean / string / number / array | - |
| `info` | 匹配为信息标签的规则 | boolean / string / number / array | - |
| `warning` | 匹配为警告标签的规则 | boolean / string / number / array | - |
| `danger` | 匹配为危险标签的规则 | boolean / string / number / array | - |
| `other` | 未命中任何规则时的兜底标签类型 | string | `primary` |
| `width` | 标签宽度，会经过 `handleWidthHeight` 处理 | string / number | - |
| `height` | 标签高度，会经过 `handleWidthHeight` 处理 | string / number | - |

### 常用透传属性

| 属性名 | 说明 | 类型 | 默认值 |
| :----: | ---- | ---- | ------ |
| `effect` | 标签主题 | `dark` / `light` / `plain` | `light` |
| `size` | 标签尺寸 | `large` / `default` / `small` | `default` |
| `closable` | 是否显示关闭按钮 | boolean | `false` |
| `round` | 是否使用圆角样式 | boolean | `false` |
| `hit` | 是否有描边效果 | boolean | `false` |

### 事件

| 事件名 | 说明 |
| :----: | ---- |
| `click` | 点击标签时触发，透传自 `el-tag` |
| `close` | 关闭标签时触发，需配合 `closable` 使用 |

### 插槽

| 插槽名 | 说明 |
| :----: | ---- |
| `default` | 自定义标签内容；传入后会覆盖默认的 `value`/映射文案展示 |

### options 数据格式

#### 1. 平铺数组 + `config`

适合后端直接返回普通枚举列表，再配合 `primary/info/warning/danger` 决定颜色。

```ts
const options = [
  { name: '未知', value: 'Unknown' },
  { name: '正常', value: 'Normal' },
  { name: '问题', value: 'Issue' },
]
```

```vue
<o-tag
  :value="row.status"
  :options="options"
  :config="{ label: 'name', value: 'value' }"
  :primary="['Normal']"
  :info="['Unknown']"
  :danger="['Issue']"
/>
```

#### 2. 分组映射数组

适合把“标签文案”和“颜色类型”都直接写在同一份映射里。

```ts
const options = [
  { danger: [{ Issue: '问题' }, { OutOfService: '未激活' }] },
  { warning: [{ Loading: '激活中' }, { Standby: '备用' }] },
  { info: [{ Unknown: '未知' }] },
  { primary: [{ InService: '已激活' }] },
]
```

```vue
<o-tag :value="status" :options="options" />
```

### 颜色使用原则

|  淡蓝色(primary)   | 橙色(warning)                         | 红色(danger)    | 灰色(info)       |
| :----------------: | ------------------------------------- | --------------- | ---------------- |
| 消息/运行中/已激活 | 警告/紧张/停止中/启动中/激活中/停服中 | 错误/问题/ISSUE | 未知/停止/未激活 |

### 说明

- 未传 `options` 时，组件会优先使用 `type`，否则再按 `primary/info/warning/danger` 规则匹配颜色。
- `primary/info/warning/danger` 支持三种常见写法：
  - 传数组：命中某些值时使用对应类型。
  - 传单个值：当前值全等匹配时使用对应类型。
  - 传布尔值：为 `true` 时直接使用对应类型。
- 使用 `options + config` 时，标签文案来自映射项的 `label` 字段，标签颜色来自四种类型规则的匹配结果。
- 使用分组映射数组时，组件会同时从映射中解析标签文案和标签类型。
- 如果没有命中任何类型规则，会回退到 `other`，默认是 `primary`。
