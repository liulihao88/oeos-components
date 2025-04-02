<script setup lang="ts" name="OEmpty">
import { ref, getCurrentInstance } from 'vue'
import { processWidth } from '@/utils'
import group_null from '@/assets/images/group_null.png'
const props = defineProps({
  description: {
    type: String,
    default: '暂无数据',
  },
  width: {
    type: [String, Number],
    default: 60,
  },
  height: {
    type: [String, Number],
  },
  imgAttrs: {
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
/** @使用方式
<o-empty description="您没有消费订单" width="48"></o-empty>
<o-empty class="w-100%" src="https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg" width="200" ></o-empty>
*/
</script>

<template>
  <el-empty v-bind="{ ...$attrs, ...props }">
    <template #image>
      <slot name="image">
        <img
          :src="src"
          :style="{
            width: processWidth(props.width, true),
            height: processWidth(props.height, true),
            ...props.imgAttrs,
          }"
        />
      </slot>
    </template>
    <template #description>
      <slot name="description">
        {{ description }}
      </slot>
    </template>
    <slot></slot>
  </el-empty>
</template>

<style scoped lang="scss">
:deep(.el-empty) {
  height: 100%;
}
:deep(.el-empty__description) {
  color: var(--65);
}
:deep(.el-empty__image) {
  width: unset;
}
</style>
