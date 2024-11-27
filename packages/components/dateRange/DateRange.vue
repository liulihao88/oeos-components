<script setup lang="ts">
import { ref, useAttrs, getCurrentInstance, computed } from 'vue'
const { proxy } = getCurrentInstance()
const attrs = useAttrs()
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: '300px',
  },
})

const oneDay = 3600 * 1000 * 24
const shortcuts = [
  {
    text: '今天',
    value: () => {
      const startTimestamp = new Date(new Date().toLocaleDateString()).getTime()
      return [new Date(startTimestamp), new Date(startTimestamp + oneDay - 1)]
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
  {
    // 本月起始时间-本月结束
    text: '本月',
    value: () => {
      const nowTemp = new Date().getTime() // 当前时间戳-1673325323605
      const nextMonth = nowTemp + oneDay * new Date().getDate() // 保证是下个月1676090190150
      const end = new Date()
      const start = new Date(new Date(new Date().toLocaleDateString()).setDate(1))
      return [start, end]
    },
  },
  {
    text: '上月',
    value: () => {
      const start = new Date()
      const end = new Date(start)
      end.setMonth(start.getMonth())
      start.setMonth(start.getMonth() - 1)
      end.setDate(0)
      start.setDate(1)
      return [start, end]
    },
  },
  {
    text: '最近30天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近90天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
  {
    text: '最近1年',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
      return [start, end]
    },
  },
  {
    text: '一月以前30天',
    value: () => {
      const start = new Date(new Date(new Date().toLocaleDateString()).getTime() - oneDay * 60)
      const yesEnd = new Date(new Date(new Date().toLocaleDateString()).getTime() - oneDay * 30)
      return [start, yesEnd]
    },
  },
]
const handleWidth = () => {
  if (!props.width) {
    return {}
  }
  let parseWidth = proxy.processWidth(props.width, true)
  return {
    width: parseWidth,
  }
}
/**
* @描述 日期dateRange选择框
* @使用方法
const dateValue = ref([])
<o-date-range
  v-model="dateValue"
  format="YYYY-MM-DD HH:mm:ss"
></o-date-range>
* @param
*/

const mergedAttrs = computed(() => {
  let baseAttrs = {
    shortcuts: shortcuts,
    'value-format': 'YYYY-MM-DD HH:mm:ss',
    format: 'YYYY-MM-DD',
    type: 'daterange',
    'start-placeholder': '开始日期',
    'end-placeholder': '结束日期',
    'range-separator': '-',
  }
  const merged = { ...baseAttrs, ...attrs }
  return merged
})
</script>

<template>
  <div class="o-date-range" :style="{ ...handleWidth() }">
    <o-comp-title :title="props.title" :size="attrs.size" :titleAttrs="$attrs.titleAttrs ?? {}"></o-comp-title>
    <el-date-picker v-bind="mergedAttrs" class="o-date-range__picker"></el-date-picker>
  </div>
</template>

<style scoped lang="scss">
.o-date-range {
  display: inline-flex;
  :deep(.el-date-editor) {
    flex: 1;
  }
}
</style>
