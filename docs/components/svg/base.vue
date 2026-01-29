<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <o-svg name="icon_file-cloud-line" ></o-svg>
    <o-title title="改变大小 size"></o-title>
    <o-svg name="icon_file-cloud-line" size="50" color="blue"></o-svg>
    <o-title title="改变颜色 color"></o-title>
    <o-svg name="icon_file-cloud-line" size="50" color="red"></o-svg>
  </div>
</template>
