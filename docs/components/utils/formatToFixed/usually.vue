<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { formatToFixed, $toast } from '@/utils/src/index.ts'
let arr = [
  { label: 'formatToFixed(22, { digit: 4 })', value: formatToFixed(22, { digit: 4 }) },
  { label: 'formatToFixed(22, { prefix: "$" })', value: formatToFixed(22, { prefix: '$' }) },
  { label: 'formatToFixed(22, { suffix: "%" })', value: formatToFixed(22, { suffix: '%', digit: 2 }) },
  { label: 'formatToFixed(22 TB, { unit: false })', value: formatToFixed('22 TB', { unit: false }) },
  {
    label: 'formatToFixed(222222, { prefix: "$", suffix: "%", digit: 4 })',
    value: formatToFixed(222222, { prefix: '$', suffix: '%', digit: 4 }),
  },
  {
    label: 'formatToFixed(222222, { prefix: "$", suffix: "%", digit: 4, thousands: true })',
    value: formatToFixed(222222, { prefix: '$', suffix: '%', digit: 4, thousands: true }),
  },
]
</script>

<template>
  <OFunctionSourceCode functionName="formatToFixed"></OFunctionSourceCode>
  <o-descriptions :options="arr" title="formatToFixed" :column="1"></o-descriptions>
</template>
