<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
let aa = proxy.clone([1, 2, 3])
console.log(`71 aa`, aa)
</script>

<template>
  <div>
    <div>docs/examples/OTest/base.vue</div>
    <o-title title="comps"></o-title>
  </div>
</template>
