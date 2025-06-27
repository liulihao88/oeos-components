<template>
  <div class="f-st-ct">
    <el-date-picker
      ref="datePickerRef"
      v-model="dateRange"
      type="datetimerange"
      range-separator="至"
      value-format="x"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      :disabled-date="disabledDate"
      :shortcuts="shortcuts"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, watch } from 'vue'
const { proxy } = getCurrentInstance()

const props = defineProps({
  modelValue: {
    type: [Number, String, Array],
    default: () => {
      return [new Date().getTime() - 86400 * 1000, new Date().getTime()]
    },
  },
})
const dateRange = ref(props.modelValue)
const emits = defineEmits(['update:modelValue'])
const datePickerRef = ref(null)
const oneDay = 3600 * 1000 * 24
const isValid = ref(true)

// 定义时间快捷键（2周、7天、3天、24小时）
const shortcuts = [
  {
    text: '今天',
    value: () => {
      const startTimestamp = new Date(new Date().toLocaleDateString()).getTime()
      return [new Date(startTimestamp), new Date()]
    },
  },
  {
    text: '昨天',
    value: () => {
      const start = new Date(new Date(new Date().toLocaleDateString()).getTime() - oneDay)
      const yesEnd = new Date(new Date(new Date().toLocaleDateString()).getTime() - 1)
      return [start, yesEnd]
    },
  },
  {
    text: '最近7天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * (7 - 1))
      return [start, end]
    },
  },
  {
    text: '本周',
    value: () => {
      const end = new Date()
      const start = new Date()
      const nows = start.getDay() || 7
      start.setTime(start.getTime() - 3600 * 1000 * 24 * (nows - 1))
      return [start, end]
    },
  },
  {
    text: '上周',
    value: () => {
      const end = new Date()
      const start = new Date()
      const nows = start.getDay() || 7
      console.log(`63 nows`, nows)
      start.setTime(start.getTime() - 3600 * 1000 * 24 * (nows - 1 + 7))
      end.setTime(end.getTime() - 3600 * 1000 * 24 * nows)
      return [start, end]
    },
  },
]

watch(
  () => dateRange.value,
  (val) => {
    if (!val || val.length < 2) return
    const [startTime, endTime] = val
    const duration = endTime - startTime
    const minDuration = 30 * 60 * 1000
    const maxDuration = 14 * 86400 * 1000

    // if (duration < minDuration) {
    //   isValid.value = false
    //   datePickerRef.value.handleOpen()
    //   dateRange.value = props.modelValue
    //   return proxy.$toast('时间范围不能小于30分钟！', 'e')
    // } else if (duration > maxDuration) {
    //   isValid.value = false
    //   dateRange.value = props.modelValue
    //   datePickerRef.value.handleOpen()
    //   return proxy.$toast('时间范围不能超过2周！', 'e')
    // }
    emits('update:modelValue', val)
  },
  {
    deep: true,
    immediate: true,
  },
)

// 防止选择未来时间（可选）
const disabledDate = (time) => {
  return time > new Date() // 禁用未来的日期
}
</script>
