# clone 深克隆

## Hidden Title {.md-hidden}

### 基础用法

:::demo
UClone/base
:::

```javascript
/**
 * 克隆数据并根据需要复制数组
 * @param {any} data - 要克隆的数据
 * @param {number} [times=1] - 如果是数组，要复制的次数
 * @returns {any} - 克隆后的数据或复制后的数组
 * clone(123) => 123
 * clone([1,2, {name: 'andy'}], 2) => [1, 2, {name: 'andy'}, 1, 2, {name: 'andy'}]
 */
export function clone(data, times = 1) {
  if (isRef(data)) {
    data = unref(data)
  }
  // Check if the data is not an array
  if (getType(data) !== 'array') {
    // If not an array, return a deep clone of the data
    return cloneDeep(data)
  }
  const clonedData = cloneDeep(data)
  const result: typeof clonedData = []
  for (let i = 0; i < times; i++) {
    result.push(...clonedData)
  }
  return result
}
```