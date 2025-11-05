<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { formatBytes, getType } from '@/utils/src/index.ts'
const options = [
  { label: 'formatBytes(1040000)', value: formatBytes(1040000) },
  { label: 'formatBytes(1040000, { thousands: false })', value: formatBytes(1040000, { thousands: false }) },
  { label: 'formatBytes(1040000, { digit: 4 })', value: formatBytes(1040000, { digit: 4 }) },
  {
    label: 'formatBytes(1040000, { thousands: false, digit: 4 })',
    value: formatBytes(1040000, { thousands: false, digit: 1 }),
  },
  {
    label: 'formatBytes(1040000, { prefix: "ppp", suffix: "/s" })',
    value: formatBytes(1040000, { prefix: 'ppp', suffix: '/s' }),
  },
  {
    label: 'formatBytes(21430403072) 默认向下取整',
    value: formatBytes(21430403072),
  },
  {
    label: 'formatBytes(21430403072, { roundType: "round" }) 向上取整',
    value: formatBytes(21430403072, { roundType: 'round' }),
  },
]
</script>

<template>
  <OFunctionSourceCode functionName="formatBytes"></OFunctionSourceCode>
  <div>
    <o-descriptions :options="options" :column="1" :showAll="true"></o-descriptions>
  </div>
</template>
