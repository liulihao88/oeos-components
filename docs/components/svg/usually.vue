<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <o-svg name="icon_file-cloud-line" :customStyle="{ width: '100px', height: '100px', color: 'red' }"></o-svg>

    <o-svg name="403" :customStyle="{ width: '100px', height: '100px', color: 'red' }"></o-svg>
    <o-svg name="hot" :customStyle="{ width: '100px', height: '100px', color: 'blue' }"></o-svg>
    <o-svg name="back" :customStyle="{ width: '100px', height: '100px', color: 'blue' }"></o-svg>
    <o-svg name="service" :customStyle="{ width: '100px', height: '100px', color: 'blue' }"></o-svg>
    <o-svg name="dialog3" :customStyle="{ width: '100px', height: '100px', color: 'red' }"></o-svg>
  </div>
</template>
