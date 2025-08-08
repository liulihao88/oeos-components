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

const randomValue = ref(1)
setInterval(() => {
  randomValue.value = Math.floor(Math.random() * 10) + 1
}, 300)
</script>

<template>
  <div>
    <o-tag :primary="[1, 2]" :content="content" :warning="[4, 5]" :danger="[6, 7]" width="100" height="100">
      
    </o-tag>
    <o-tag
      :primary="randomValue === 2"
      :danger="randomValue === 3"
      :info="randomValue === 4"
      :warning="randomValue === 5"
    >
      {{ randomValue }}
    </o-tag>
  </div>
</template>
