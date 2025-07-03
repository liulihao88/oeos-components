<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const data = ref([
  { name: '<1023', value: 12345, value2: 9999999999999999999994513 },
  { name: '<2M', value: 3, value2: 444444 },
])

const data2 = ref([
  { name: '<1023', value: 1, value2: 123451 },
  { name: '<2M', value: 1, value2: 444444 },
  // { name: '<3M', value: 3, value2: 444444 },
  // { name: '<4M', value: 3, value2: 444444 },
  // { name: '<5M', value: 3, value2: 1984444342113 },
])
</script>

<template>
  <div>
    <OCountBarOld :data="data" style="height: 300px"></OCountBarOld>
    <hr />
    <hr />
    <OCountBarOld :data="data2" style="height: 300px"></OCountBarOld>
  </div>
</template>
