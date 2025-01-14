<template>
  <svg aria-hidden="true" v-bind="$attrs" class="svg-box" :style="parseStyle">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts" name="OSvg">
import { computed, getCurrentInstance } from 'vue'
import { processWidth } from '../../../utils'
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    // default: 'icon_file-cloud-line',
    required: true,
  },
  color: {
    type: String,
  },
  customStyle: {
    type: Object,
    default: () => {},
  },
  size: {
    type: [String, Number],
    default: '16px',
  },
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const parseStyle = computed(() => {
  return {
    width: processWidth(props.size, true),
    height: processWidth(props.size, true),
    ...props.customStyle,
  }
})
</script>
<style lang="scss" scoped>
.svg-box {
  fill: currentColor;
  overflow: hidden;
}
</style>
