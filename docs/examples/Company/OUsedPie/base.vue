<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const data = [
  {
    name: '使用量',
    value: 0,
  },
  {
    name: '已用量',
    value: 222,
  },
  {
    name: '总量',
    value: 0,
  },
]
</script>

<template>
  <div>
    <OUsedPie :used="211" :total="222" style="height: 300px"></OUsedPie>
    <OUsedPie :used="0" :total="0" style="height: 300px"></OUsedPie>
    <OUsedPie :used="0" :total="34" style="height: 300px"></OUsedPie>
  </div>
</template>
