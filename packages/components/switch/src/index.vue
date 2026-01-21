<script setup lang="ts">
import { computed } from 'vue'
import { processWidth } from '@oeos-components/utils'
import { ref, getCurrentInstance } from 'vue'

defineOptions({
  name: 'OSwitch',
})

const props = defineProps({
  beforeChange: {
    type: Function,
  },
  width: {
    type: [String, Number],
    default: '',
  },
})

const loading = ref(false) // 内部管理 loading 状态
//✅ 封装 beforeChange，自动管理 loadingconst
const beforeChangeHandler = async () => {
  if (!props.beforeChange) return true // 如果没有 beforeChange，直接允许切换
  try {
    loading.value = true
    await props.beforeChange() // 等待 Promise 完成
    return true // 允许切换
  } catch (err) {
    return false // 阻止切换
  } finally {
    loading.value = false // 无论成功失败，都关闭 loading
  }
}

const handleWidth = computed(() => {
  if (!props.width) {
    return 'unset'
  }
  let inputWidth = processWidth(props.width, true)
  return inputWidth
})
</script>

<template>
  <el-switch
    v-bind="$attrs"
    inline-prompt
    class="o-custom-switch"
    :loading="loading"
    :before-change="beforeChangeHandler"
    :style="{ '--switch-width': handleWidth }"
  />
</template>

<style lang="scss" scoped>
.o-custom-switch {
  flex-direction: row-reverse; /* 反转子元素的顺序 */
  align-items: center;
  margin-right: 8px;
  :deep(.el-switch__label--right) {
    order: 1; /* 将active-text放在左边 */
    margin-right: 8px;
    margin-left: 0;
    font-weight: 900;
  }
  :deep(.el-switch__label--left) {
    margin-left: 8px;
    margin-right: 0;
    font-weight: 900;
  }
  :deep(.el-switch__core) {
    width: var(--switch-width) !important;
  }
}
</style>
