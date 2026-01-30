<template>
  <o-tooltip :visible="visible">
    <template #content>
      <span>Content</span>
    </template>
    <el-button @mouseenter="visible = true" @mouseleave="visible = false">Hover me</el-button>
  </o-tooltip>

  <oClickOutside @clickOutside="outer">
    <el-button @click="triggerContent" class="w-100 ml" style="width: 100px">显示content</el-button>
  </oClickOutside>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const triggerContent = () => {
  visible.value = !visible.value
}
const outer = () => {
  visible.value = false
}
</script>
