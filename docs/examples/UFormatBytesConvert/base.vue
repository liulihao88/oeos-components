<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { formatBytesConvert, getType } from '@/utils/src/index.ts'

const options = [
  { label: `formatBytesConvert('1,234 GB')`, value: formatBytesConvert('1,234 GB') },
  { label: `formatBytesConvert('1234GB')`, value: formatBytesConvert('1234GB') },
  { label: `formatBytesConvert('1234gb')`, value: formatBytesConvert('1234GB') },
  { label: 'formatBytesConvert(1040000)', value: formatBytesConvert(1040000) },
  {
    label: 'formatBytesConvert(1040000, { thounsands: true })',
    value: formatBytesConvert(1040000, { thounsands: true }),
  },
  { label: 'formatBytesConvert(1040000, { digit: 2 })', value: formatBytesConvert(1040000, { digit: 2 }) },
  {
    label: 'formatBytesConvert(1040000, { thounsands: true, digit: 2 })',
    value: formatBytesConvert(1040000, { thounsands: true, digit: 2 }),
  },
  {
    label: 'formatBytesConvert(0)',
    value: formatBytesConvert(0),
  },
]
</script>

<template>
  <div>
    <o-description :options="options" :column="1" label-width="500"></o-description>
  </div>
</template>
