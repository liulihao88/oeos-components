<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const data = ref([
  { name: '<1023', value: 123 },
  { name: '<2M', value: 33 },
])
</script>

<template>
  <div>
    <OCountBar :data="data" style="height: 300px"></OCountBar>
  </div>
</template>
