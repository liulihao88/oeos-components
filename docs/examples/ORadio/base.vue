<template>
  <o-radio v-model="value" :options="options" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref(2)
const options = ref([
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', id: 3 },
])
</script>
