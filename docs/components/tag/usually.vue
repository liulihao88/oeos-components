<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const value = ref(0)
setInterval(() => {
  value.value++
  if (value.value === 8) {
    value.value = 0
  }
}, 1000)

const randomValue = ref(1)
setInterval(() => {
  randomValue.value = Math.floor(Math.random() * 10) + 1
}, 300)
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
