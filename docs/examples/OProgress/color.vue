<script setup lang="ts">
import { ref, getCurrentInstance, onUnmounted } from 'vue'
const { proxy } = getCurrentInstance()
function progressColor(value) {
  if (value < 20) {
    return 'red'
  } else if (value < 50) {
    return 'green'
  } else if (value < 80) {
    return '#5D7AF7'
  } else {
    return 'yellow'
  }
}
const percentage = ref(0)
const timer = ref()
timer.value = setInterval(() => {
  percentage.value += 1
  if (percentage.value > 100) {
    percentage.value = 0
  }
}, 30)
onUnmounted(() => {
  clearInterval(timer.value)
})
</script>

<template>
  <div>
    <o-progress :percentage="percentage" :color="progressColor"></o-progress>
  </div>
</template>
