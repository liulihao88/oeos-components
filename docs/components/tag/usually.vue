<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const value = ref(0)
const valueTimer = window.setInterval(() => {
  value.value++
  if (value.value === 8) {
    value.value = 0
  }
}, 1000)

const randomValue = ref(1)
const randomTimer = window.setInterval(() => {
  randomValue.value = Math.floor(Math.random() * 10) + 1
}, 300)

onUnmounted(() => {
  window.clearInterval(valueTimer)
  window.clearInterval(randomTimer)
})
</script>

<template>
  <div>
    <o-tag
      :primary="[1, 2]"
      :value="value"
      :warning="[3, 4]"
      :danger="[5, 6]"
      :info="7"
      width="100"
      height="100"
    ></o-tag>
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
