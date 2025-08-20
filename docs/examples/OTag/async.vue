<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

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

for (const item of map2) {
  console.log(`68 item`, item)
}

const value = ref('InService')
// const value = 'InService'

setInterval(() => {
  if (value.value === 'InService') {
    value.value = 'OutOfService'
  } else {
    value.value = 'InService'
  }
}, 3000)
</script>

<template>
  <div>
    <o-tag :options="map2" width="100" height="100" :value="value"></o-tag>
  </div>
</template>
