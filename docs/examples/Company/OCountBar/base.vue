<script setup lang="ts">
import { ref, getCurrentInstance, computed } from 'vue'
const { proxy } = getCurrentInstance()
// const data = ref([
//   { name: '<1023', value: 12345, value2: 9999999999999999999994513 },
//   { name: '<2M', value: 3, value2: 444444 },
// ])

const data = ref({
  inCount: {
    '<1024B': 0,
    '1K-1MB': 60,
    '1MB-10MB': 35,
    '10MB-50MB': 0,
    '50MB-100MB': 2,
    '100MB-500MB': 0,
    '500MB-1GB': 0,
    '1GB-5GB': 0,
    '>5GB': 0,
  },
  inSize: {
    '<1024B': 0,
    '1K-1MB': 6564380,
    '1MB-10MB': 88532114,
    '10MB-50MB': 0,
    '50MB-100MB': 197013682,
    '100MB-500MB': 0,
    '500MB-1GB': 0,
    '1GB-5GB': 0,
    '>5GB': 0,
  },
  updatetime: 0,
})
const data2 = {
  inCount: {
    '<1024B': 3,
    '~1MB': 0,
    '~10MB': 0,
    '~50MB': 0,
    '~100MB': 0,
    '~500MB': 0,
    '~1GB': 0,
    '~5GB': 0,
    '>5GB': 3,
  },
  inSize: {
    '<1024B': 1711,
    '~1MB': 0,
    '~10MB': 0,
    '~50MB': 0,
    '~100MB': 0,
    '~500MB': 0,
    '~1GB': 0,
    '~5GB': 0,
    '>5GB': 16106127363,
  },
  updatetime: 0,
}


const newData = computed(() => {
  return Object.entries(originData.value.inCount).map(([keysOf, value]) => {
    return {
      name: keysOf,
      value: value,
      value2: originData.value.inSize[keysOf],
    }
  })
})
</script>

<template>
  <div>
    <OCountBar :data="data" style="height: 300px"></OCountBar>
    <hr />

    <OCountBar :data="data2" style="height: 300px"></OCountBar>
  </div>
</template>
