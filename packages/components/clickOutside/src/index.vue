<template>
  <div ref="wrapRef" v-bind="$attrs" class="clickOutside-box">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
// https://vueuse.org/core/onClickOutside/
import { ref, onMounted, onUnmounted, watch, type Ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

defineOptions({
  name: 'OClickOutside',
})

const emit = defineEmits(['clickOutside', 'mounted'])

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
})

const wrapRef = ref(null)

// 用于存储清理函数
let stopListener: (() => void) | null = null

const setupClickOutside = (currentOptions: object) => {
  if (!wrapRef.value) {
    return // 如果 ref 仍然无效，则不进行任何操作
  }

  // 先移除旧的监听器（如果存在）
  if (stopListener) {
    stopListener()
  }

  // 设置新的监听器，并存储其清理函数
  stopListener = onClickOutside(
    wrapRef,
    () => {
      // 现在我们可以安全地访问 ref 和 options
      // 将事件对象和配置一起发出，信息更全
      console.log(`25 currentOptions`, currentOptions);
      emit('clickOutside', { ...currentOptions })
    },
    currentOptions,
  )
}

// 1. 组件挂载后，设置一次监听
onMounted(() => {
  setupClickOutside(props.options)
  emit('mounted', wrapRef.value) // 同时触发 mounted 事件
})

// 2. 监听 options 的变化，并在变化时重新设置监听
watch(
  () => props.options,
  (newOptions) => {
    setupClickOutside(newOptions)
  },
  { deep: true }, // 移除了 immediate: true
)

// 3. 组件卸载时，确保移除监听器，防止内存泄漏
onUnmounted(() => {
  if (stopListener) {
    stopListener()
  }
})
</script>

<style lang="scss" scoped>
.clickOutside-box {
  display: inline-block;
}
</style>
