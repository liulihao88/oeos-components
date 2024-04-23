<template>
  <el-tooltip class="tooltip" effect="dark" :disabled="isDisabled" v-bind="$attrs">
    <span
      @click="contentClick"
      v-if="props.showSlot"
      class="tooltip__text"
      :style="{ maxWidth: width }"
      @mouseover="onMouseOver"
    >
      <span ref="contentRef">
        {{ $attrs.content }}
      </span>
    </span>
    <slot></slot>
  </el-tooltip>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

const props = defineProps({
  width: {
    type: String,
    default: '100%',
  },
  showSlot: {
    type: Boolean,
    default: true,
  },
})
const contentRef = ref()
const isDisabled = ref(false)
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
