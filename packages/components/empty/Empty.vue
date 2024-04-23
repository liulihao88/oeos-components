<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import group_null from '../../assets/images/group_null.png'
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
    default: () => {},
  },
  src: {
    type: String,
    default: () => {
      return group_null
    },
  },
})
function handleUnit(str) {
  if (!str) {
    return ''
  }
  if (typeof str === 'string' && (str.indexOf('px') !== -1 || str.indexOf('%') !== -1)) {
    return str
  }
  return str + 'px'
}
/** @使用方式
 <o-empty description="您没有消费订单" size="48"></o-empty>
  <o-empty class="w-100%" src="https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg" size="200" ></o-empty>
*/
</script>

<template>
  <el-empty v-bind="{ ...$attrs, ...props }">
    <template #image>
      <img
        :src="src"
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
:deep(.el-empty) {
  height: 100%;
}
:deep(.el-empty__description p) {
  color: var(--65);
}
:deep(.el-empty__image) {
  width: unset;
}
</style>
