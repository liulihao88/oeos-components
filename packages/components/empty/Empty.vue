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
    default: 60,
  },
  customStyle: {
    type: Object,
    default: () => {}
  },
  url: {
    type: String,
    default: 'https://atts.w3cschool.cn/rabbit600x600.png'
  }
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
 <o-empty description="您没有消费订单" size="48"></o-empty>
  <o-empty class="w-100%" url="https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg" size="200" ></o-empty>
*/
</script>

<template>
  <el-empty :description="props.description" v-bind="$attrs">
    <template #image>
      <img
        :src="url"
        :style="{
          width: handleUnit(props.size),
          height: handleUnit(props.size),
          ...props.customStyle,
        }"
      />
    </template>
  </el-empty>
</template>

<style scoped lang="scss">
:deep(.ep-empty) {
  height: 100%;
}
:deep(.ep-empty__description p) {
  color: #666;
}
:deep(.el-empty__image) {
  width: unset;
}
</style>
