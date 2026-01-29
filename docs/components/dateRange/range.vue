<template>
  <div>
    <o-date-range
      v-model="dateRange"
      :disabled-date="disabledDate"
      @calendar-change="calendarChange"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
      :shortcuts="shortcuts"
    ></o-date-range>
    {{ dateRange }}
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const dateRange = ref([null, null])
const choiceStartDate = ref() // 用于存储选中的第一个日期

const disabledDate = (time) => {
  if (choiceStartDate.value) {
    const oneDay = 24 * 60 * 60 * 1000 // 一天的毫秒数
    const minTime = choiceStartDate.value - 7 * oneDay // 第一个日期
    const maxTime = choiceStartDate.value + 7 * oneDay // 第一个日期之后的7天
    return time.getTime() < minTime || time.getTime() > maxTime
  }
  return false // 如果没有选择第一个日期，则不限制
}

const calendarChange = (value) => {
  let [start, end] = value
  if (start && !end) {
    choiceStartDate.value = start.getTime()
  } else {
    choiceStartDate.value = ''
  }
}
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
]
</script>
