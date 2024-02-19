<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
  description: {
    type: String,
    default: '暂无数据',
  },
  size: {
    type: [String, Number],
    default: 24,
  },
})
function handleUnit(str) {
  if (!str) {
    return ''
  }
  if (
    typeof str === 'string' &&
    (str.indexOf('px') !== -1 || str.indexOf('%') !== -1)
  ) {
    return str
  }
  return str + 'px'
}
/** @使用方式
 <g-empty description="您没有消费订单" width="48" height="48"></g-empty>
 large-empty.png
*/
</script>

<template>
  <el-empty :description="props.description">
    <template #image>
      <img
        src="https://atts.w3cschool.cn/rabbit600x600.png"
        :style="{
          width: handleUnit(props.size),
          height: handleUnit(props.size),
        }"
      />
    </template>
  </el-empty>
</template>

<style scoped lang="scss">
:deep(.ep-empty__image) svg {
  width: 60px;
  height: 60px;
}
:deep(.ep-empty) {
  height: 100%;
}
:deep(.ep-empty__description p) {
  color: #666;
}
</style>
