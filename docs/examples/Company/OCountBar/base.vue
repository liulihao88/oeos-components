<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const data = ref([
  { name: '<1023', value: 12, value2: 12345 },
  { name: '<2M', value: 3, value2: 444444 },
])

const data2 = ref([
  { name: '<1023', value: 12, value2: 12345 },
  { name: '<2M', value: 3, value2: 444444 },
  { name: '<3M', value: 3, value2: 444444 },
  { name: '<4M', value: 3, value2: 444444 },
  { name: '<5.22222M', value: 3, value2: 444444 },
])
</script>

<template>
  <div>
    <OCountBar :data="data" style="height: 300px"></OCountBar>
    <hr />
    <OCountBar :data="data2" style="height: 300px"></OCountBar>
  </div>
</template>
