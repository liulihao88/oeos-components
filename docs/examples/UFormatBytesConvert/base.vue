<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { formatBytesConvert, getType } from '@/utils/src/index.ts'
let arr = [
  { label: '基本用法', value: '0.5GB' },
  { label: '加千分位', value: ['1,234 GB', { thounsand: true }] },
  { label: '加小数点', value: ['1,234 GB', { toFixed: 2 }] },
  { label: '加千分位和小数点', value: ['1,234 GB', { thounsand: true, toFixed: 2 }] },
]
</script>

<template>
  <div>
    <div v-for="(v, i) in arr" :key="i">
      <div v-if="getType(v.value) !== 'array'" class="f">
        <div class="label mr">{{ v.label }}</div>
        <div class="value">
          {{ formatBytesConvert(v.value) }}
        </div>
      </div>
      <div v-else class="f">
        <div class="label mr">{{ v.label }}</div>
        <div class="value">
          {{ formatBytesConvert(...v.value) }}
        </div>
      </div>
    </div>
  </div>
</template>
