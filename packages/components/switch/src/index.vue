<script setup lang="ts" name="OSwitch">
/** @使用方式
 <o-switch
    v-model="form.enableMetaDataInject"
    disabled
    active-text="开启管理控制1"
  ></o-switch>
*/
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

const props = defineProps({
  beforeChange: {
    type: Function,
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
</script>

<template>
  <el-switch
    v-bind="$attrs"
    inline-prompt
    class="o-custom-switch"
    :loading="loading"
    :before-change="beforeChangeHandler"
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
}
</style>
