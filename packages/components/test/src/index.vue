<script setup lang="ts">
defineOptions({
  name: 'OTest',
})
import { ref, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <div>packages/components/test/src/index.vue</div>
  </div>
</template>
