<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
let base = proxy.toFixed(22)
let string = proxy.toFixed('22')
let digit4 = proxy.toFixed('22', 4)
let toNumber = proxy.toFixed('22.321321', 2, true)

import { toFixed, getType } from '@/utils/src/index.ts'
let arr = [
  { label: '基本用法22', value: 22 },
  { label: '字符串22', value: '22' },
  { label: '22无小数点', value: ['22', 0] },
  { label: '小数点变4位 22', value: ['22', 4] },
  { label: '小数点变4位 12.345678', value: [12.345678, 4] },
  { label: '1.0 TB', value: ['1.0 TB'] },
  { label: '1.0tb', value: ['1.0tb'] },
  { label: '0', value: [0] },
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
