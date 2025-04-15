<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const data = ref([
  { name: '<1023', value: 1200000000000, value2: 12345 },
  { name: '<2M', value: 3, value2: 444444 },
])

const data2 = ref([
  { name: '<1023', value: 1, value2: 12345 },
  { name: '<2M', value: 1, value2: 444444 },
  // { name: '<3M', value: 3, value2: 444444 },
  // { name: '<4M', value: 3, value2: 444444 },
  // { name: '<5M', value: 3, value2: 1984444342113 },
])
</script>

<template>
  <div>
    <OCountBar :data="data" style="height: 300px"></OCountBar>
    <hr />
    <hr />
    <OCountBar :data="data2" style="height: 300px"></OCountBar>
  </div>
</template>
