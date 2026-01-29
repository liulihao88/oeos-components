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
const trueData = ref({})
setTimeout(() => {
  trueData.value = { used: 43087420916, total: '200.00 GB' }
}, 200)
</script>

<template>
  <div>
    <OUsedPie :used="211" :total="222" style="height: 300px"></OUsedPie>
    <OUsedPie :used="341" :total="222" style="height: 300px"></OUsedPie>
    <OUsedPie :used="0" :total="0" style="height: 300px"></OUsedPie>
    <OUsedPie :used="0" :total="34" style="height: 300px"></OUsedPie>
    <OUsedPie v-bind="trueData" style="height: 300px"></OUsedPie>
    <oBasicLayout title="桶容量信息统计" class="f-1 mt2 w-100% h-500">
      <OUsedPie v-bind="trueData" />
    </oBasicLayout>
  </div>
</template>
