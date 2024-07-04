<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const val = ref('0')

console.log(`%c31 5行 docs/examples/OTest/base.vue val`, 'background:#fff;color:blue', val)
proxy.log(`val`, val, `__INJECT_FILE_PATH__`)
</script>

<template>
  <div></div>
</template>
