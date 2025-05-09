<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <o-svg name="403" :customStyle="{width: '100px', height: '100px', color: 'yellow'}" ></o-svg>
  </div>
</template>