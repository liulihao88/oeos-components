<script setup lang="ts">
import { ref, nextTick, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  label: {
    type: [String, Number],
    default: '',
  },
})

const textRef = ref<HTMLElement | null>(null)
const isOverflow = ref(false)
let resizeObserver: ResizeObserver | null = null

const isGreaterThan = (a: number, b: number, epsilon = 0.03) => a - b > epsilon

const getPadding = (el: HTMLElement) => {
  const style = window.getComputedStyle(el, null)
  const paddingLeft = Number.parseInt(style.paddingLeft, 10) || 0
  const paddingRight = Number.parseInt(style.paddingRight, 10) || 0
  const paddingTop = Number.parseInt(style.paddingTop, 10) || 0
  const paddingBottom = Number.parseInt(style.paddingBottom, 10) || 0

  return {
    left: paddingLeft,
    right: paddingRight,
    top: paddingTop,
    bottom: paddingBottom,
  }
}

const updateOverflow = () => {
  const el = textRef.value
  if (!el || !el.childNodes.length || !el.textContent?.trim()) {
    isOverflow.value = false
    return
  }

  const container = (el.closest('.cell') as HTMLElement | null) || el.parentElement
  if (!container) {
    isOverflow.value = false
    return
  }

  const range = document.createRange()
  range.setStart(el, 0)
  range.setEnd(el, el.childNodes.length)

  const { width: rangeWidth, height: rangeHeight } = range.getBoundingClientRect()
  const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect()
  const { top, left, right, bottom } = getPadding(container)
  const horizontalPadding = left + right
  const verticalPadding = top + bottom

  isOverflow.value =
    isGreaterThan(rangeWidth + horizontalPadding, containerWidth) ||
    isGreaterThan(rangeHeight + verticalPadding, containerHeight) ||
    isGreaterThan(el.scrollWidth, containerWidth)
}

onMounted(() => {
  nextTick(updateOverflow)

  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      updateOverflow()
    })

    const cell = textRef.value?.closest('.cell')
    if (cell) {
      resizeObserver.observe(cell)
    }

    const th = textRef.value?.closest('th')
    if (th) {
      resizeObserver.observe(th)
    }
  }
})

watch(
  () => props.label,
  () => {
    nextTick(updateOverflow)
  },
)

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})

const handleMouseEnter = () => {
  nextTick(updateOverflow)
}
</script>

<template>
  <el-tooltip
    :disabled="!isOverflow"
    :content="String(label ?? '')"
    placement="top"
    effect="dark"
    :show-after="0"
    :hide-after="0"
  >
    <span ref="textRef" class="o-table__header-text" @mouseenter="handleMouseEnter">
      {{ label }}
    </span>
  </el-tooltip>
</template>

<style scoped lang="scss">
.o-table__header-text {
  display: block;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
