<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { formatTime } from '@/utils/src/index.ts'

const options = [
  { label: 'formatTime()', value: formatTime() },
  { label: 'formatTime(new Date())', value: formatTime(new Date()) },
  { label: "formatTime('2026-01-14T12:36:11.332')", value: formatTime('2026-01-14T12:36:11.332') },
  { label: "formatTime('2018-02-13T06:17')", value: formatTime('2018-02-13T06:17') },
  { label: `formatTime('2020/03/02 06:02')`, value: formatTime('2020/03/02 06:02') },
  { label: `formatTime(1541927611000)`, value: formatTime(1541927611000) },
  { label: `formatTime(1541927611)`, value: formatTime(1541927611) },
  {
    label: `formatTime(1541927611, '{y}/{m}/{d} {h}:{m}:{s}')`,
    value: formatTime(1541927611, '{y}/{m}/{d} {h}:{m}:{s}'),
  },
  {
    label: `formatTime(new Date(), '{y}/{m}/{d} {h}:{m}:{s}')`,
    value: formatTime(new Date(), '{y}/{m}/{d} {h}:{m}:{s}'),
  },
  {
    label: `formatTime(1764128798.456)`,
    value: formatTime(1764128798.456),
  },
  {
    label: `formatTime(1764128798.456), '{m}/{d}'`,
    value: formatTime(1764128798.456, '{m}/{d}'),
  },
  {
    label: `formatTime(), '{y}-{m}-{d} {h}:{i}:{s} 星期{a}'`,
    value: formatTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s} 星期{a}'),
  },
]
</script>

<template>
  <OFunctionSourceCode functionName="formatTime"></OFunctionSourceCode>
  <div>
    <o-descriptions :options="options" title="时间转换" :column="1"></o-descriptions>
  </div>
</template>
