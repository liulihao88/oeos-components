<script setup lang="ts" name="OCapacityProgress">
/**
 <o-capacity-progress :total="row.totalSpace" :used="row.usedSpace">
    {{ proxy.formatBytes(row.usedSpace) }} / {{ proxy.formatBytes(row.totalSpace) }}
  </o-capacity-progress>
 */

import { ref, getCurrentInstance, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { getVariableColor } from '@/utils/localIndex.ts'
import { sleep } from '@/utils/index.ts'

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
})
function format() {
  return `${percentage.value}%`
}
const percentage = computed(() => {
  let divideNum = Number((props.used || 0) / (props.total || 0)) * 100 || 0
  if (isNaN(divideNum)) {
    return 0
  }
  let percentRes = Number(divideNum.toFixed(2))
  return percentRes
})
function formatColor(value) {
  if (value < 90) {
    return getVariableColor('--blue')
  } else {
    return getVariableColor('--red')
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
      :percentage="percentage"
      type="line"
      :stroke-width="20"
      text-inside
      :format="format"
      :color="formatColor"
    >
      <template #default="{ percentage }">
        <div ref="percentageRef" class="f-bt-ct" :style="{ ...adaptiveWidth() }">
          <div class="percentage-value">{{ format() }}</div>
          <div class="">
            <slot />
          </div>
        </div>
      </template>
    </o-progress>
    <o-icon v-if="percentage > 100" name="warning" content="已用容量远超总容量, 请扩容 " class="ml" />
  </div>
</template>

<style lang="scss" scoped>
.progress-box :deep(.el-progress-bar__outer) {
  width: 100%;
  background: var(--green);
}
</style>
