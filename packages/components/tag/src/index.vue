<script setup lang="ts">
defineOptions({
  name: 'OTag',
})

import { ref, getCurrentInstance, computed } from 'vue'
import { processWidth, getType, notEmpty } from '@oeos-components/utils'
const { proxy } = getCurrentInstance()
import { handleWidthHeight } from '@/components/utils/local.ts'
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  value: {
    type: [String, Number],
  },
  width: {
    type: [String, Number],
  },
  height: {
    type: [String, Number],
  },
  primary: {
    type: [String, Number, Array],
  },
  warning: {
    type: [String, Number, Array],
  },
  danger: {
    type: [String, Number, Array],
  },
  info: {
    type: [String, Number, Array],
  },

  other: {
    type: String,
    default: 'primary',
  },
  type: {
    type: String,
  },
  config: {
    type: Object,
    default: () => {},
  },
})

const parseContent = computed(() => {
  if (props.options.length > 0 && props.value) {
    return optionsGetName.value
  } else {
    return props.value
  }
})

const optionsGetName = ref()
const changeGetName = (foundItem) => {
  optionsGetName.value = foundItem[props.value]
}

const parseType = computed(() => {
  const { primary, warning, info, danger, other, type } = props
  if (props.options.length > 0 && props.value) {
    if (notEmpty(props.config)) {
      for (let i = 0; i < props.options.length; i++) {
        const foundItem = props.options.find((obj) => props.value === obj[props.config.value || 'value'])
        if (foundItem) {
          optionsGetName.value = foundItem[props.config.label || 'label']
          if (primary.includes(props.value)) {
            return 'primary'
          }
          if (info.includes(props.value)) {
            return 'info'
          }
          if (warning.includes(props.value)) {
            return 'warning'
          }
          if (danger.includes(props.value)) {
            return 'danger'
          }
        }
      }
      return other
    } else {
      for (const item of props.options) {
        // 遍历 item 的所有键值对（而不是只取第一个）
        for (const [type, items] of Object.entries(item)) {
          const foundItem = items.find((obj) => props.value in obj)
          if (foundItem) {
            changeGetName(foundItem)
            return type
          }
        }
      }
      return null
    }
  }

  if (type) {
    return type
  }

  // 先检查是否是数组，确保统一处理
  const getMatchType = (types, type) => {
    const normalizedTypes = Array.isArray(types) ? types : [types]
    if (getType(types) === 'array') {
      return normalizedTypes.includes(props.value) ? type : null
    } else if (getType(types) === 'boolean') {
      return types === true ? type : null
    } else {
      return null
    }
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
  <el-tag v-bind="$attrs" :type="parseType" :style="{ ...handleWidthHeight(props.width, props.height) }">
    <slot>
      {{ parseContent }}
    </slot>
  </el-tag>
</template>
