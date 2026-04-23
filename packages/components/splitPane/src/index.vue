<template>
  <div
    ref="containerRef"
    class="o-split-pane"
    :class="[`is-${mergedSplit}`, { 'is-dragging': active }]"
    :style="containerStyle"
  >
    <div class="o-split-pane__pane o-split-pane__pane-left" :style="leftPaneStyle">
      <slot name="paneL">
        <slot name="left" />
      </slot>
    </div>

    <div
      class="o-split-pane__resizer"
      role="separator"
      :aria-orientation="mergedSplit === 'vertical' ? 'vertical' : 'horizontal'"
      :aria-valuemin="mergedMinPercent"
      :aria-valuemax="100 - mergedMinPercent"
      :aria-valuenow="percent"
      @click="handleResizerClick"
      @pointerdown="handlePointerDown"
    />

    <div class="o-split-pane__pane o-split-pane__pane-right" :style="rightPaneStyle">
      <slot name="paneR">
        <slot name="right" />
      </slot>
    </div>

    <div v-show="active" class="o-split-pane__mask" />
  </div>
</template>

<script setup lang="ts" name="OSplitPane">
import { computed, onBeforeUnmount, ref, watch, type PropType } from 'vue'
import { processWidth } from '@oeos-components/utils'
import type { SplitPaneDirection, SplitPaneSetting } from './types'

defineOptions({
  name: 'OSplitPane',
})

const props = defineProps({
  splitSet: {
    type: Object as PropType<SplitPaneSetting>,
    default: () => ({}),
  },
  split: {
    type: String as PropType<SplitPaneDirection>,
    default: 'vertical',
  },
  minPercent: {
    type: Number,
    default: 0,
  },
  defaultPercent: {
    type: Number,
    default: 50,
  },
  resizerSize: {
    type: [String, Number],
    default: 6,
  },
  resetOnClick: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    type: Number,
    default: undefined,
  },
})

const emits = defineEmits(['resize', 'update:modelValue'])

const containerRef = ref<HTMLElement | null>(null)
const active = ref(false)
const hasMoved = ref(false)
const percent = ref(50)
const previousUserSelect = ref('')

const mergedSplit = computed<SplitPaneDirection>(() => {
  return props.splitSet?.split || props.split
})

const mergedMinPercent = computed(() => {
  return normalizeMinPercent(props.splitSet?.minPercent ?? props.minPercent)
})

const mergedDefaultPercent = computed(() => {
  return props.splitSet?.defaultPercent ?? props.defaultPercent
})

const mergedModelValue = computed(() => {
  return props.modelValue
})

const resizerSizeValue = computed(() => {
  return processWidth(props.resizerSize, true)
})

const containerStyle = computed(() => {
  return {
    cursor: active.value ? (mergedSplit.value === 'vertical' ? 'col-resize' : 'row-resize') : undefined,
    '--o-split-pane-resizer-size': resizerSizeValue.value,
  }
})

const leftPaneStyle = computed(() => {
  return {
    flex: `${percent.value} 1 0%`,
  }
})

const rightPaneStyle = computed(() => {
  return {
    flex: `${100 - percent.value} 1 0%`,
  }
})

watch(
  [mergedModelValue, mergedDefaultPercent, mergedMinPercent],
  () => {
    const nextPercent = typeof mergedModelValue.value === 'number' ? mergedModelValue.value : mergedDefaultPercent.value
    setPercent(nextPercent, false)
  },
  {
    immediate: true,
  },
)

function normalizeMinPercent(value: number) {
  const normalized = Number.isFinite(value) ? value : 0
  return Math.min(Math.max(normalized, 0), 49)
}

function clampPercent(value: number, min: number) {
  const normalized = Number.isFinite(value) ? value : 50
  return Math.min(Math.max(normalized, min), 100 - min)
}

function setPercent(value: number, emitResize = true) {
  const nextPercent = clampPercent(value, mergedMinPercent.value)
  percent.value = nextPercent
  if (emitResize) {
    emits('update:modelValue', nextPercent)
    emits('resize', nextPercent)
  }
}

function handleResizerClick() {
  if (!props.resetOnClick || hasMoved.value) {
    return
  }

  setPercent(50)
}

function handlePointerDown(event: PointerEvent) {
  if (event.button !== 0) {
    return
  }

  active.value = true
  hasMoved.value = false
  previousUserSelect.value = document.body.style.userSelect
  document.body.style.userSelect = 'none'
  window.addEventListener('pointermove', handlePointerMove)
  window.addEventListener('pointerup', handlePointerUp)
  window.addEventListener('pointercancel', handlePointerUp)
}

function handlePointerMove(event: PointerEvent) {
  if (!active.value || !containerRef.value) {
    return
  }

  const rect = containerRef.value.getBoundingClientRect()
  const total = mergedSplit.value === 'vertical' ? rect.width : rect.height
  if (total <= 0) {
    return
  }

  const current = mergedSplit.value === 'vertical' ? event.clientX - rect.left : event.clientY - rect.top
  const nextPercent = Math.floor((current / total) * 10000) / 100

  setPercent(nextPercent)
  hasMoved.value = true
}

function handlePointerUp() {
  if (active.value) {
    document.body.style.userSelect = previousUserSelect.value
  }
  active.value = false
  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('pointerup', handlePointerUp)
  window.removeEventListener('pointercancel', handlePointerUp)
}

onBeforeUnmount(() => {
  handlePointerUp()
})
</script>

<style scoped lang="scss">
.o-split-pane {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  box-sizing: border-box;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
}

.o-split-pane__pane {
  position: relative;
  overflow: hidden;
  min-width: 0;
  min-height: 0;
}

.o-split-pane.is-vertical {
  flex-direction: row;

  .o-split-pane__resizer {
    flex: 0 0 var(--o-split-pane-resizer-size, 6px);
    width: var(--o-split-pane-resizer-size, 6px);
    height: 100%;
    cursor: col-resize;

    &::before {
      width: 2px;
      height: 28px;
      background: repeating-linear-gradient(to bottom, currentColor 0 2px, transparent 2px 6px);
    }
  }
}

.o-split-pane.is-horizontal {
  flex-direction: column;

  .o-split-pane__resizer {
    flex: 0 0 var(--o-split-pane-resizer-size, 6px);
    width: 100%;
    height: var(--o-split-pane-resizer-size, 6px);
    cursor: row-resize;

    &::before {
      width: 28px;
      height: 2px;
      background: repeating-linear-gradient(to right, currentColor 0 2px, transparent 2px 6px);
    }
  }
}

.o-split-pane__resizer {
  position: relative;
  z-index: 2;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--el-text-color-secondary, #909399);
  background: var(--el-border-color-lighter, #ebeef5);
  transition:
    background-color 0.2s,
    color 0.2s;

  &::before {
    content: '';
    display: block;
    border-radius: 999px;
  }

  &:hover {
    color: var(--el-color-primary, #409eff);
    background: var(--el-color-primary-light-9, #ecf5ff);
  }
}

.o-split-pane.is-dragging {
  .o-split-pane__resizer {
    color: var(--el-color-primary, #409eff);
    background: var(--el-color-primary-light-8, #d9ecff);
  }
}

.o-split-pane__mask {
  position: absolute;
  inset: 0;
  z-index: 1;
}
</style>
