<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { getType } from '@/utils/src/index.ts'

const options = [
  { label: 'getType(new RegExp())', value: getType(new RegExp()) },
  { label: 'getType(new Date())', value: getType(new Date()) },
  { label: 'getType([])', value: getType([]) },
  { label: 'getType({})', value: getType({}) },
  { label: 'getType(null)', value: getType(null) },
  { label: 'getType(undefined)', value: getType(undefined) },
  { label: 'getType(123)', value: getType(123) },
  { label: 'getType("123")', value: getType('123') },
  { label: 'getType("")', value: getType('') },
  { label: 'getType(Symbol())', value: getType(Symbol()) },
  { label: 'getType(new Map())', value: getType(new Map()) },
  { label: 'getType(new WeakMap())', value: getType(new WeakMap()) },
]
</script>

<template>
  <div>
    123
    <o-descriptions :options="options" title="uuid随机字符" :column="1" label-width="600"></o-descriptions>
  </div>
</template>
