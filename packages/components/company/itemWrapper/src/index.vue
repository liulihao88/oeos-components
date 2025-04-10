<template>
  <div class="item-wrapper-box">
    <slot></slot>
  </div>
</template>

<script setup lang="ts" name="OItemWrapper">
import { ref, onMounted, watch } from 'vue'
const props = defineProps({
  gap: {
    type: [String, Number],
    default: '16px',
  },
})
</script>

<style lang="scss" scoped>
.item-wrapper-box {
  display: flex;
  align-items: stretch;
  justify-content: space-between; /* Default to flex-start */
  gap: v-bind('props.gap');
}

// 默认儿子组件都是 flex: 1, 自适应布局
.item-wrapper-box {
  > :deep(*) {
    flex: 1;
  }
}
</style>
