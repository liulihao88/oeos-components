<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const now = new Date()
console.log(`54 now`, now);
console.log(`54 typeof now`, typeof now);
let res = proxy.isEmpty(now)
console.log(`22 res`, res);
</script>

<template>
  <div>
    <div>docs/examples/OTest/base.vue</div>
  </div>
</template>