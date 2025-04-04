<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const data = [
  {
    name: '使用量',
    value: 111,
  },
  {
    name: '已用量',
    value: 222,
  },
  {
    name: '总量',
    value: 333,
  },
]
</script>

<template>
  <div>
    <OUsedPie :used="211" :total="222" style="height: 200px"></OUsedPie>
  </div>
</template>
