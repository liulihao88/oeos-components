<script setup lang="ts">
import { ref } from 'vue'
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
      const start = new Date(
        new Date(new Date().toLocaleDateString()).getTime() - oneDay,
      )
      const yesEnd = new Date(
        new Date(new Date().toLocaleDateString()).getTime() - 1,
      )
      return [start, yesEnd]
    },
  },
  {
    // 本月起始时间-本月结束
    text: '本月',
    value: () => {
      const nowTemp = new Date().getTime() // 当前时间戳-1673325323605
      const nextMonth = nowTemp + oneDay * new Date().getDate() // 保证是下个月1676090190150
      const end = new Date()
      const start = new Date(
        new Date(new Date().toLocaleDateString()).setDate(1),
      )
      return [start, end]
    },
  },
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]
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
</script>

<template>
  <div>
    <el-date-picker
      style="width: 440px"
      :shortcuts="shortcuts"
      value-format="YYYY-MM-DD HH:mm:ss"
      format="YYYY-MM-DD"
      type="daterange"
      v-bind="$attrs"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    ></el-date-picker>
  </div>
</template>

<style scoped lang="scss"></style>
