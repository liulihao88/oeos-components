<script setup lang="ts">
defineOptions({
  name: 'OTag',
})

import { ref, computed } from 'vue'
import { getType, isEmpty } from '@oeos-components/utils'
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
    type: [String, Number, Boolean, Array],
  },
  warning: {
    type: [String, Number, Boolean, Array],
  },
  danger: {
    type: [String, Number, Boolean, Array],
  },
  info: {
    type: [String, Number, Boolean, Array],
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

const hasValue = computed(() => !isEmpty(props.value, true))
const hasOptions = computed(() => props.options.length > 0)

const parseContent = computed(() => {
  if (hasOptions.value && hasValue.value && !isEmpty(optionsGetName.value, true)) {
    return optionsGetName.value
  } else {
    return props.value
  }
})

const optionsGetName = ref()

const changeGetName = (foundItem, key = props.value) => {
  optionsGetName.value = foundItem?.[key]
}

const getMatchType = (types, type) => {
  const normalizedTypes = Array.isArray(types) ? types : [types]
  if (getType(types) === 'array') {
    return normalizedTypes.includes(props.value) ? type : null
  } else if (getType(types) === 'boolean') {
    return types === true ? type : null
  } else if (types === props.value) {
    return type
  } else {
    return null
  }
}

const parseType = computed(() => {
  const { primary, warning, info, danger, other, type } = props
  optionsGetName.value = undefined

  if (hasOptions.value && hasValue.value) {
    if (!isEmpty(props.config)) {
      const foundItem = props.options.find((obj) => props.value === obj[props.config.value || 'value'])
      if (foundItem) {
        optionsGetName.value = foundItem[props.config.label || 'label']
        return (
          getMatchType(primary, 'primary') ||
          getMatchType(info, 'info') ||
          getMatchType(warning, 'warning') ||
          getMatchType(danger, 'danger') ||
          other
        )
      }
      return other
    } else {
      for (const item of props.options) {
        for (const [type, items] of Object.entries(item)) {
          if (!Array.isArray(items)) continue
          const foundItem = items.find((obj) => Object.prototype.hasOwnProperty.call(obj, props.value))
          if (foundItem) {
            changeGetName(foundItem, props.value)
            return type
          }
        }
      }
      return other
    }
  }

  if (type) {
    return type
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
