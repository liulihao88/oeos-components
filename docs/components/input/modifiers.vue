<template>
  <o-flex gap="small"> 
    <o-input v-model.lazy="input" style="width: 240px" placeholder="lazy" />
    <o-input v-model.number="input" style="width: 240px" placeholder="number" />
    <o-input v-model.trim="input" style="width: 240px" placeholder="trim" />
    {{ input }}
  </o-flex>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input = ref('')
</script>
