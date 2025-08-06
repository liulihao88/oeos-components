<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { formatBytes, getType } from '@/utils/src/index.ts'
let arr = [
  { label: '基本用法', value: '1040000' },
  { label: '不加千分位', value: ['1040000', { thousands: false }] },
  { label: '加小数点', value: ['1040000', { toFixed: 2 }] },
  { label: '加千分位和小数点', value: ['1040000', { thounsand: true, toFixed: 2 }] },

  { label: '加前缀和后缀', value: ['1040000', { prefix: 'ppp', suffix: '/s' }] },
]
</script>

<template>
  <div>
    <div v-for="(v, i) in arr" :key="i">
      <div v-if="getType(v.value) !== 'array'" class="f">
        <div class="label mr">{{ v.label }}</div>
        <div class="value">
          {{ formatBytes(v.value) }}
        </div>
      </div>
      <div v-else class="f">
        <div class="label mr">{{ v.label }}</div>
        <div class="value">
          {{ formatBytes(...v.value) }}
        </div>
      </div>
    </div>
  </div>
</template>
