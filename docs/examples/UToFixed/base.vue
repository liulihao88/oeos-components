<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
let base = proxy.toFixed(22)
let string = proxy.toFixed('22')
let digit4 = proxy.toFixed('22', 4)
let toNumber = proxy.toFixed('22.321321', 2, true)

import { toFixed, getType } from '@/utils/index.ts'
let arr = [
  { label: '基本用法', value: 22 },
  { label: '字符串', value: '22' },
  { label: '小数点变4位', value: ['22', 4] },
  { label: '变为数字', value: ['22', 2, true] },
]
</script>

<template>
  <div>
    <div v-for="(v, i) in arr" :key="i">
      <div v-if="getType(v.value) !== 'array'" class="f">
        <div class="label mr">{{ v.label }}</div>
        <div class="value">
          {{ toFixed(v.value) }}
        </div>
      </div>
      <div v-else class="f">
        <div class="label mr">{{ v.label }}</div>
        <div class="value">
          {{ toFixed(...v.value) }}
        </div>
      </div>
    </div>
  </div>
</template>
