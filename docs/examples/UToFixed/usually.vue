<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
// import { toFixed, getType } from '@oeos-components/utils'
import { toFixed, getType } from '@/utils/src/index.ts'
let arr = [
  { label: '加digit', value: [22, { digit: 4 }] },
  { label: '加前缀prefix', value: [22, { prefix: '$' }] },
  { label: '加后缀suffix', value: [22, { suffix: '%' }] },
  { label: '不要单位unit', value: ['22 TB', { unit: false }] },
  { label: '所有options属性', value: ['22 TB', { prefix: '$', suffix: '%', unit: false }] },
]
</script>

<template>
  <div>
    第二个参数是对象的用法
    <div v-for="(v, i) in arr" :key="i">
      <div v-if="getType(v.value) !== 'array'" class="f">
        <div class="label mr">{{ v.label }}</div>
        <div class="value">
          {{ toFixed(v.value, v.options) }}
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
