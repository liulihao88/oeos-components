<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { formatTime, getType } from '@/utils/src/index.ts'
let arr = [
  { label: '基本用法', value: new Date() },
  { label: '转换时间', value: '2018-02-13T06:17' },
  { label: '转换时间2', value: '2020/03/02 06:02' },
  { label: '13位时间戳', value: 1541927611000 },
  { label: '10位时间戳', value: 1541927611 },
  { label: '自定义时分秒', value: [1541927611, '{y}/{m}/{d} {h}:{m}:{s}'] },
]
</script>

<template>
  <div>
    <div v-for="(v, i) in arr" :key="i">
      <div v-if="getType(v.value) !== 'array'" class="f">
        <div class="label mr">{{ v.label }}:</div>
        <div class="value">
          {{ formatTime(v.value) }}
        </div>
      </div>
      <div v-else class="f">
        <div class="label mr">{{ v.label }}</div>
        <div class="value">
          {{ formatTime(...v.value) }}
        </div>
      </div>
    </div>
  </div>
</template>
