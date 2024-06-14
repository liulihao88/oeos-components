<template>
  <el-tooltip class="tooltip" v-bind="tooltipAttrs" :disabled="handleDisabled">
    <span
      @click="contentClick"
      v-if="props.showSlot"
      class="tooltip__text"
      :style="{ maxWidth: width }"
      @mouseover="onMouseOver"
      v-bind="$attrs"
    >
      <span ref="contentRef">
        <slot>
          {{ $attrs.content }}
        </slot>
      </span>
    </span>
  </el-tooltip>
</template>

<script setup lang="ts">
import { ref, nextTick, useSlots, computed, getCurrentInstance, useAttrs } from 'vue'
import { isBoolean } from 'lodash-es'
const slots = useSlots()
const attrs = useAttrs()
const { proxy } = getCurrentInstance()

const props = defineProps({
  width: {
    type: String,
    default: '100%',
  },
  showSlot: {
    type: Boolean,
    default: true,
  },
  tooltipAttrs: {
    type: Object,
    default: () => ({}),
  },
})
const contentRef = ref()
const isDisabled = ref(false)
const handleDisabled = computed(() => {
  console.log(`72 attrs.disabled`, attrs.disabled)
  if (attrs.disabled) {
    return attrs.disabled
  }
  if (!attrs.content) {
    return true
  }
  if (slots.default) {
    return false
  }
  return isDisabled.value
})
function onMouseOver() {
  if (!props.showSlot) {
    return
  }
  // 内容超出，显示文字提示内容
  const tag = contentRef.value
  if (!tag) return
  const parentWidth = tag.parentNode.offsetWidth // 获取元素父级可视宽度
  const contentWidth = tag.offsetWidth // 获取元素可视宽度
  isDisabled.value = contentWidth <= parentWidth
}
const emits = defineEmits(['click'])
function contentClick() {
  emits('click')
}
</script>
<style lang="scss" scoped>
.tooltip__text {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
}
</style>
