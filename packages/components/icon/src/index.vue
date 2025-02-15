<script setup lang="ts" name="OIcon">
/**
  <o-icon name="delete" color="blue"></o-icon>
  <o-icon name="arrow-right" color="blue"></o-icon>
  <o-icon name="plus" color="red" size="2em"></o-icon>
  <o-icon name="loading" class="is-loading p-l-200"></o-icon>
 */
import { ref, computed } from 'vue'
import { toLine } from '@/utils'
import OSvg from '@/components/svg'
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  size: {
    type: [String, Number],
    default: '16px', // 1em, 10px 10, 100%,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: '', // svg
  },
  svgAttrs: {
    type: Object,
    default: () => ({}),
  },
})
const emits = defineEmits(['click'])
function handleClick($event) {
  if (props.disabled) return
  emits('click', $event)
}
const parseColor = computed(() => {
  if (props.disabled) return '#c8c9cc'
  return props.color
})
</script>

<template>
  <el-icon
    :color="parseColor"
    props.disabled
    :size="props.size"
    class="o-icon"
    :class="props.disabled && 'o-icon__not-allowed'"
    @click="handleClick"
  >
    <el-tooltip :disabled="!$attrs.content" v-bind="$attrs">
      <span ref="contentRef">
        <o-svg v-if="type === 'svg'" v-bind="svgAttrs" :name="name"></o-svg>
        <component :is="`el-icon-${toLine(props.name)}`" v-else></component>
      </span>
    </el-tooltip>
  </el-icon>
</template>

<style scoped lang="scss">
.o-icon {
  // cursor: pointer;
}
.o-icon__not-allowed {
  cursor: not-allowed;
}
.o-icon + .o-icon {
  margin-left: 12px;
}
</style>
