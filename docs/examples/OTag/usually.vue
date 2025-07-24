<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const content = ref(0)
setInterval(() => {
  content.value++
  if (content.value === 8) {
    content.value = 0
  }
}, 1000)
</script>

<template>
  <div>
    <o-tag :success="[1, 2]" :content="content" :info="3" :warning="[4, 5]" :danger="[6, 7]"></o-tag>
  </div>
</template>
