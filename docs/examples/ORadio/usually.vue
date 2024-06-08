<template>
  <div>
    <o-radio v-model="value" :options="options" value="id" label="name"  />
    <br />
    <o-radio v-model="value" :options="options" value="id" label="name" showType="button" size="small" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref(3)
const options = ref([
  { name: 'Option 111', id: 1 },
  { name: 'Option 2', id: 2 },
  { name: 'Option 3', id: 3 },
])
</script>
