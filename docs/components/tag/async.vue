<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const map2 = [
  {
    danger: [{ Issuce: '问题' }, { OutOfService: '未激活1' }],
  },
  {
    warning: [{ Loading: '激活中' }, { Unloading: '停服中' }, { Standby: '备用' }],
  },
  {
    info: [{ Unknown: '未知' }],
  },
  {
    primary: [{ InService: '已激活' }],
  },
]

const value = ref('InService')
const timer = window.setInterval(() => {
  if (value.value === 'InService') {
    value.value = 'OutOfService'
  } else {
    value.value = 'InService'
  }
}, 3000)

onUnmounted(() => {
  window.clearInterval(timer)
})
</script>

<template>
  <div>
    <o-tag :options="map2" width="100" height="100" :value="value"></o-tag>
  </div>
</template>
