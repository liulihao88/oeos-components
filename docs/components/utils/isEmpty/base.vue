<script setup lang="ts">
import { isEmpty } from '@/utils/src/index.ts'

const symbolObject = { [Symbol('x')]: 1 }

const options = [
  {
    label: 'isEmpty(undefined)',
    value: isEmpty(undefined),
  },
  { label: 'isEmpty(null)', value: isEmpty(null) },
  { label: "isEmpty('')", value: isEmpty('') },
  { label: "isEmpty(' ')", value: isEmpty(' ') },
  { label: 'isEmpty(false)', value: isEmpty(false), labelAttrs: { class: 'cl-blue' }, valueAttrs: { class: 'cl-blue' } },
  { label: "isEmpty(new Date('无效日期'))", value: isEmpty(new Date('无效日期')) },
  {
    label: 'isEmpty(new Date())',
    value: isEmpty(new Date()),
    labelAttrs: { class: 'cl-blue' },
    valueAttrs: { class: 'cl-blue' },
  },
  { label: 'isEmpty(0)', value: isEmpty(0), labelAttrs: { class: 'cl-blue' }, valueAttrs: { class: 'cl-blue' } },
  { label: 'isEmpty([])', value: isEmpty([]) },
  { label: 'isEmpty({})', value: isEmpty({}) },
  { label: 'isEmpty(NaN)', value: isEmpty(NaN) },
  { label: 'isEmpty(new Set())', value: isEmpty(new Set()) },
  { label: 'isEmpty(new Map())', value: isEmpty(new Map()) },
  {
    label: 'isEmpty(BigInt(0))',
    value: isEmpty(BigInt(0)),
    labelAttrs: { class: 'cl-blue' },
    valueAttrs: { class: 'cl-blue' },
  },
  {
    label: 'isEmpty(/abc/)',
    value: isEmpty(/abc/),
    labelAttrs: { class: 'cl-blue' },
    valueAttrs: { class: 'cl-blue' },
  },
  {
    label: 'isEmpty(Promise.resolve(1))',
    value: isEmpty(Promise.resolve(1)),
    labelAttrs: { class: 'cl-blue' },
    valueAttrs: { class: 'cl-blue' },
  },
  {
    label: 'isEmpty({ [Symbol()]: 1 })',
    value: isEmpty(symbolObject),
    labelAttrs: { class: 'cl-blue' },
    valueAttrs: { class: 'cl-blue' },
  },

  {
    label: 'isEmpty(0, false)',
    value: isEmpty(0, false),
  },
  {
    label: 'isEmpty(false, false)',
    value: isEmpty(false, false),
  },
  {
    label: 'isEmpty(BigInt(0), false)',
    value: isEmpty(BigInt(0), false),
  },
]
</script>

<template>
  <OFunctionSourceCode functionName="isEmpty"></OFunctionSourceCode>
  <o-warning
    class="mb2"
    content="默认会把 undefined、null、空字符串、空数组、空对象、NaN、空 Set/Map、无效日期 视为空值；0、false、BigInt(0) 默认不再算空。<br>如果需要兼容旧语义，可以显式传第二个参数 false。"
  />

  <o-descriptions :options="options" title="isEmpty判断是否为空" :column="1"></o-descriptions>
</template>
