<script setup lang="ts">
/**
  <o-icon name="delete" color="blue"></o-icon>
  <o-icon name="arrow-right" color="blue"></o-icon>
  <o-icon name="plus" color="red" size="2em"></o-icon>
  <o-icon name="loading" class="is-loading p-l-200"></o-icon> 
 */
import { ref, getCurrentInstance, computed } from 'vue'
const { proxy } = getCurrentInstance()
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
})
const emits = defineEmits(['click'])
function handleClick() {
  if (props.disabled) return
  emits('click')
}
const parseColor = computed(() => {
  if (props.disabled) return '#c8c9cc'
  return props.color
})
</script>

<template>
  <el-icon
    :color="parseColor"
    disabled
    :size="props.size"
    class="o-icon"
    :class="props.disabled && 'o-icon__not-allowed'"
    @click="handleClick"
  >
    <el-tooltip :disabled="!$attrs.content" v-bind="$attrs">
      <span ref="contentRef">
        <component :is="`el-icon-${proxy.toLine(props.name)}`"></component>
      </span>
    </el-tooltip>
  </el-icon>
</template>

<style scoped lang="scss">
.o-icon {
  cursor: pointer;
}
.o-icon__not-allowed {
  cursor: not-allowed;
}
.o-icon + .o-icon {
  margin-left: 12px;
}
</style>
