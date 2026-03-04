<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { processWidth } from '@/utils/src/base.ts'
const cc = ref()
</script>

<template>
  <div>
    <div>docs/components/test/base.vue</div>
    <o-input v-model="cc" width="100px" />
  </div>
</template>
