<script setup lang="ts" name="OCapacityProgress">
/**
 <o-capacity-progress :total="row.totalSpace" :used="row.usedSpace">
    {{ proxy.formatBytes(row.usedSpace) }} / {{ proxy.formatBytes(row.totalSpace) }}
  </o-capacity-progress>
 */

import { ref, computed, onMounted, onUnmounted } from 'vue'
import { sleep, getVariable } from '@/utils/index.ts'
import { formatBytes } from '@/utils'

const progressBoxRef = ref(null)
const percentageRef = ref(null)
const props = defineProps({
  total: {
    type: [String, Number],
    required: true,
  },
  used: {
    type: [String, Number],
    required: true,
  },
  iconAttrs: {
    // 超出容量的显示icon
    type: Object,
    default: () => {},
  },
})
function format() {
  if (percentage.value < 0) {
    return '?%'
  }
  return `${percentage.value}%`
}
function parseSpace(space) {
  if (!space) {
    return '0.00B'
  }
  if (space < 0) {
    return '?'
  }
  return formatBytes(space ?? 0)
}
const percentage = computed(() => {
  const used = Number(props.used) || 0
  const total = Number(props.total) || 0
  let divideNum = (used / total) * 100 || 0
  if (isNaN(divideNum)) {
    return 0
  }
  let percentRes = Number(divideNum.toFixed(2))
  return percentRes
})
function formatColor(value) {
  if (value < 90) {
    return getVariable('--blue')
  } else {
    return getVariable('--red')
  }
}

const adaptiveWidth = async () => {
  await sleep()
  if (progressBoxRef.value && progressBoxRef.value?.$el?.offsetWidth) {
    let width = `${progressBoxRef.value.$el.offsetWidth - 16}px`
    percentageRef.value.style.width = width
    return { width: width }
  } else {
    return { width: '200px' }
  }
}

onMounted(() => {
  window.addEventListener('resize', adaptiveWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', adaptiveWidth)
})
</script>

<template>
  <div class="f-st-ct w-100%">
    <o-progress
      ref="progressBoxRef"
      class="progress-box"
      :class="{ 'prgress-less-zero': Number(used) < 0 }"
      :percentage="percentage"
      type="line"
      :stroke-width="20"
      text-inside
      :format="format"
      :color="formatColor"
      v-bind="$attrs"
    >
      <template #default="{ percentage }">
        <div ref="percentageRef" class="f-bt-ct" :style="{ ...adaptiveWidth() }">
          <div class="percentage-value">{{ format() }}</div>
          <div class="">
            <slot>{{ parseSpace(props.used) }} / {{ parseSpace(props.total) }}</slot>
          </div>
        </div>
      </template>
    </o-progress>
    <o-icon
      v-if="percentage > 100"
      name="warning"
      content="已用容量远超总容量, 请扩容 "
      class="ml"
      v-bind="iconAttrs"
    />
  </div>
</template>

<style lang="scss" scoped>
.progress-box :deep(.el-progress-bar__outer) {
  width: 100%;
  background: var(--green);
}
.progress-box.prgress-less-zero :deep(.el-progress-bar__outer) {
  width: 100%;
  background: #9b9a93;
}
</style>
