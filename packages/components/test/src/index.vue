<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'OTest',
})

declare const __OEOS_COMPONENTS_BUILD_TIME__: string

const props = defineProps({
  label: {
    type: String,
    default: '打包时间',
  },
  prefix: {
    type: String,
    default: '',
  },
})

const displayText = computed(() => {
  const text = `${props.label}: ${__OEOS_COMPONENTS_BUILD_TIME__}`
  return props.prefix ? `${props.prefix}${text}` : text
})
</script>

<template>
  <div class="o-test">
    {{ displayText }}
  </div>
</template>

<style scoped lang="scss">
.o-test {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  color: var(--el-text-color-primary);
  font-size: 14px;
  line-height: 1.5;
  background-color: var(--el-fill-color-light);
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 6px;
}
</style>
