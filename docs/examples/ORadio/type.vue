<template>
  <div>
    <o-radio v-model="value" type="boolean" />
    <br />
    <o-radio v-model="value2" type="simple" :options="options" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref(false)
const value2 = ref('job')
const options = ref(['andy', 'job', 'lucy'])
</script>
