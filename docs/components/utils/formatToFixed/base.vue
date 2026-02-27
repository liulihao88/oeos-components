<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { formatToFixed } from '@/utils/src/index.ts'
let arr = [
  { label: 'formatToFixed(22)', value: formatToFixed(22) },
  { label: 'formatToFixed("22")', value: formatToFixed('22') },
  { label: 'formatToFixed(22, 0)', value: formatToFixed(22, 0) },
  { label: 'formatToFixed(22, 4)', value: formatToFixed(22, 4) },
  { label: 'formatToFixed(22.12345678, 4)', value: formatToFixed(22.12345678, 4) },
  { label: 'formatToFixed("1.0 TB")', value: formatToFixed('1.0 TB') },
  { label: 'formatToFixed("1.0tb")', value: formatToFixed('1.0tb') },
  { label: 'formatToFixed("0")', value: formatToFixed(0) },
]
</script>

<template>
  <OFunctionSourceCode functionName="formatToFixed"></OFunctionSourceCode>
  <o-descriptions :options="arr" title="formatToFixed" :column="1"></o-descriptions>
</template>
