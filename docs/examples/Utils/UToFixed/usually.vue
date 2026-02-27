<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { formatToFixed } from '@/utils/src/index.ts'
let arr = [
  { label: 'toFixed(22, { digit: 4 })', value: toFixed(22, { digit: 4 }) },
  { label: 'toFixed(22, { prefix: "$" })', value: toFixed(22, { prefix: '$' }) },
  { label: 'toFixed(22, { suffix: "%" })', value: toFixed(22, { suffix: '%' }) },
  { label: 'toFixed(22 TB, { unit: false })', value: toFixed('22 TB', { unit: false }) },
  {
    label: 'toFixed(22, { prefix: "$", suffix: "%", digit: 4 })',
    value: toFixed(22, { prefix: '$', suffix: '%', digit: 4 }),
  },
]
</script>

<template>
  <OFunctionSourceCode functionName="toFixed"></OFunctionSourceCode>
  <o-descriptions :options="arr" title="toFixed" :column="1"></o-descriptions>
</template>
