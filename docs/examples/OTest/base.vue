<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    111
    <ooo-svg :customStyle="{width: '311px', height: '300px'}" color="yellow"></ooo-svg>
    <o-svg size="20" color="blue"></o-svg>
    <div>docs/examples/OTest/base.vue</div>
  </div>
</template>
