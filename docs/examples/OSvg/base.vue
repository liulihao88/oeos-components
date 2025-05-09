<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <o-svg name="404" size="30" color="red"></o-svg>
    <o-svg name="403" size="30" color="red"></o-svg>
    <o-svg name="dialog" size="40" color="blue"></o-svg>
    <o-svg name="dialog2" size="40" color="blue"></o-svg>
    <o-svg name="dialog3" size="40" color="blue"></o-svg>
  </div>
</template>