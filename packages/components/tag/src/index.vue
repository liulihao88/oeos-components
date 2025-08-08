<script setup lang="ts">
defineOptions({
  name: 'OTag',
})

import { ref, getCurrentInstance, computed } from 'vue'
import { processWidth, getType, notEmpty } from '@oeos-components/utils'
const { proxy } = getCurrentInstance()
const props = defineProps({
  primary: {
    type: [String, Number, Array],
  },
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

const parseContent = computed(() => {
  if (props.options.length > 0 && props.value) {
    return optionsGetName.value
  } else {
    return props.content
  }
})

const optionsGetName = ref()

const parseType = computed(() => {
  if (props.options.length > 0 && props.value) {
    for (const item of props.options) {
      // 获取每个对象的 key（如 'danger'）和对应的数组
      const [type, items] = Object.entries(item)[0]

      // 在 items 数组中查找是否有包含 searchKey 的对象
      const foundItem = items.find((obj) => obj.hasOwnProperty(props.value))

      if (foundItem) {
        optionsGetName.value = foundItem[props.value]
        return type
      }
    }
    return null
  }

  const { primary, warning, info, danger, content, other, type } = props
  if (type) {
    return type
  }
  // 先检查是否是数组，确保统一处理
  const getMatchType = (types, type) => {
    const normalizedTypes = Array.isArray(types) ? types : [types]
    if (getType(types) === 'array') {
      return normalizedTypes.includes(content) ? type : null
    } else {
      return types === true ? type : null
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
  <el-tag v-bind="$attrs" effect="dark" :type="parseType" :style="{ ...handleWidthHeight() }">
    <slot>
      {{ parseContent }}
    </slot>
  </el-tag>
</template>
