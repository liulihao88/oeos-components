<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { formatToFixed } from '@/utils/src/index.ts'
let arr = [
  { label: 'toFixed(22)', value: toFixed(22) },
  { label: 'toFixed("22")', value: toFixed('22') },
  { label: 'toFixed(22, 0)', value: toFixed(22, 0) },
  { label: 'toFixed(22, 4)', value: toFixed(22, 4) },
  { label: 'toFixed(22.12345678, 4)', value: toFixed(22.12345678, 4) },
  { label: 'toFixed("1.0 TB")', value: toFixed('1.0 TB') },
  { label: 'toFixed("1.0tb")', value: toFixed('1.0tb') },
  { label: 'toFixed("0")', value: toFixed(0) },
]
</script>

<template>
  <OFunctionSourceCode functionName="toFixed"></OFunctionSourceCode>
  <o-descriptions :options="arr" title="toFixed" :column="1"></o-descriptions>
</template>
