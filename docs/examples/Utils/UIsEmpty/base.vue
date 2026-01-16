<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { isEmpty, getType } from '@/utils/src/index.ts'

const options = [
  { label: 'isEmpty(undefined)', value: isEmpty(undefined) },
  { label: 'isEmpty(null)', value: isEmpty(null) },
  { label: "isEmpty('')", value: isEmpty('') },
  { label: "isEmpty(' ')", value: isEmpty(' ') },
  { label: 'isEmpty(false)', value: isEmpty(false) },
  { label: "isEmpty(new Date('无效日期'))", value: isEmpty(new Date('无效日期')) },
  { label: "isEmpty(new Date())", value: isEmpty(new Date()) },
  { label: 'isEmpty(0)', value: isEmpty(0) },
  { label: 'isEmpty([])', value: isEmpty([]) },
  { label: 'isEmpty({})', value: isEmpty({}) },
  { label: 'isEmpty(NaN)', value: isEmpty(NaN) },
  { label: 'isEmpty(new Set())', value: isEmpty(new Set()) },
  { label: 'isEmpty(new Map())', value: isEmpty(new Map()) },
  { label: 'isEmpty(BigInt(0))', value: isEmpty(BigInt(0)) },

  { label: 'isEmpty(0, true)', value: isEmpty(0, true) },
  { label: 'isEmpty(false, true)', value: isEmpty(false, true) },
]
</script>

<template>
  <OFunctionSourceCode functionName="isEmpty"></OFunctionSourceCode>
  <o-warning
    class="mb2"
    content="undefined, null, '', '   ', false, 0, [], {}, NaN, new Set(), new Map(), BigInt(0), new Date('无效日期') 均返回true，否则返回false <br> 如果参数2为true, 处理严格模式（strict=true 时，0/false 不算空）"
  />

  <o-descriptions :options="options" title="isEmpty判断是否为空" :column="1"></o-descriptions>
</template>
