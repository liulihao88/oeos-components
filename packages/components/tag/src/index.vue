<script setup lang="ts">
defineOptions({
  name: 'OTag',
})

import { ref, getCurrentInstance, computed } from 'vue'
import { processWidth } from '@oeos-components/utils'
const { proxy } = getCurrentInstance()
const props = defineProps({
  primary: {
    type: [String, Number, Array],
  },
  width: {
    type: [String, Number],
  },
  height: {
    type: [String, Number],
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

const handleWidthHeight = () => {
  if (!props.width && !props.height) {
    return {}
  }
  let widthHeightobj: Record<string, string> = {}
  if (props.width) {
    widthHeightobj.width = processWidth(props.width, true)
  }
  if (props.height) {
    widthHeightobj.height = processWidth(props.height, true)
  }
  return widthHeightobj
}

const parseType = computed(() => {
  const { primary, warning, info, danger, content, other, type } = props
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
    getMatchType(info, 'info') ||
    getMatchType(warning, 'warning') ||
    getMatchType(danger, 'danger') ||
    other // 默认返回值
  )
})
</script>

<template>
  <el-tag v-bind="$attrs" effect="dark" :type="parseType" :style="{ ...handleWidthHeight() }">
    <slot>
      {{ content }}
    </slot>
  </el-tag>
</template>
