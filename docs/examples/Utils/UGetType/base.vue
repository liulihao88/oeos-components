<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { getType } from '@/utils/src/index.ts'

const options = [
  { label: 'getType(123)', value: getType(123) },
  { label: 'getType("123")', value: getType('123') },
  { label: 'getType("")', value: getType('') },
  { label: 'getType(true)', value: getType(true) },
  { label: 'getType(null)', value: getType(null) },
  { label: 'getType(undefined)', value: getType(undefined) },
  { label: 'getType(Symbol())', value: getType(Symbol()) },
  { label: 'getType(new Date())', value: getType(new Date()) },
  { label: 'getType(new RegExp())', value: getType(new RegExp(/123/)) },
  { label: 'getType(new WeakMap())', value: getType(new WeakMap()) },
  { label: 'getType(new Map())', value: getType(new Map()) },
  { label: 'getType([])', value: getType([]) },
  { label: 'getType({})', value: getType({}) },
]
</script>

<template>
  <OFunctionSourceCode functionName="getType"></OFunctionSourceCode>
  <div>
    <o-descriptions :options="options" title="getType获取类型" :column="1"></o-descriptions>
  </div>
</template>
