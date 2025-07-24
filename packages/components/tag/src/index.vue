<script setup lang="ts">
defineOptions({
  name: 'OTag',
})

import { ref, getCurrentInstance, computed } from 'vue'
const { proxy } = getCurrentInstance()
const props = defineProps({
  primary: {
    type: [String, Number, Array],
  },
  success: {
    type: [String, Number, Array],
  },
  info: {
    type: [String, Number, Array],
  },
  warning: {
    type: [String, Number, Array],
  },
  danger: {
    type: [String, Number, Array],
  },
  content: {
    type: [String, Number],
    required: true,
  },
  other: {
    type: String,
    default: 'primary',
  },
  type: {
    type: String,
  },
})

const parseType = computed(() => {
  const { primary, success, warning, info, danger, content, other, type } = props
  if (type) {
    return type
  }
  // 先检查是否是数组，确保统一处理
  const getMatchType = (types, type) => {
    const normalizedTypes = Array.isArray(types) ? types : [types]
    return normalizedTypes.includes(content) ? type : null
  }

  return (
    getMatchType(primary, 'primary') ||
    getMatchType(success, 'success') ||
    getMatchType(info, 'info') ||
    getMatchType(warning, 'warning') ||
    getMatchType(danger, 'danger') ||
    other // 默认返回值
  )
})
</script>

<template>
  <el-tag v-bind="$attrs" effect="dark" :type="parseType">
    <slot>
      {{ content }}
    </slot>
  </el-tag>
</template>
