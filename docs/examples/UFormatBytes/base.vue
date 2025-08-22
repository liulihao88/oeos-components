<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { formatBytes, getType } from '@/utils/src/index.ts'
const options = [
  { label: 'formatBytes', value: formatBytes(1040000) },
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
]
</script>

<template>
  <div>
    <o-descriptions :options="options" :column="1"></o-descriptions>
  </div>
</template>
