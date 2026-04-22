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
const reserveWidth = ref(0)
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
  range.setStart(el as unknown as Node, 0)
  range.setEnd(el as unknown as Node, el.childNodes.length)

  const { width: rangeWidth, height: rangeHeight } = range.getBoundingClientRect()
  const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect()
  const { top, left, right, bottom } = getPadding(container as HTMLElement)
  const horizontalPadding = left + right
  const verticalPadding = top + bottom
  const availableWidth = Math.max(containerWidth - reserveWidth.value, 0)

  isOverflow.value =
    isGreaterThan(rangeWidth + horizontalPadding, availableWidth) ||
    isGreaterThan(rangeHeight + verticalPadding, containerHeight) ||
    isGreaterThan(el.scrollWidth, availableWidth)
}

const updateReserveWidth = () => {
  const th = textRef.value?.closest('th')
  reserveWidth.value = th?.classList.contains('is-sortable') ? 28 : 0
}

onMounted(() => {
  nextTick(() => {
    updateReserveWidth()
    updateOverflow()
  })

  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      updateReserveWidth()
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
    nextTick(() => {
      updateReserveWidth()
      updateOverflow()
    })
  },
)

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})

const handleMouseEnter = () => {
  nextTick(() => {
    updateReserveWidth()
    updateOverflow()
  })
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
    <span
      ref="textRef"
      class="o-table__header-text"
      :style="{ maxWidth: reserveWidth ? `calc(100% - ${reserveWidth}px)` : '100%' }"
      @mouseenter="handleMouseEnter"
    >
      {{ label }}
    </span>
  </el-tooltip>
</template>

<style scoped lang="scss">
.o-table__header-text {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
}
</style>
