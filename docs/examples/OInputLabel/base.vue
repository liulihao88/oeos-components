<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const arr = ref([])

for (let i = 0; i < 100; i++) {
  let randNum = Math.floor(Math.random() * 10000000)
  arr.value.push(randNum)
}
</script>

<template>
  <div>
    <o-input-label v-model="arr" ></o-input-label>
  </div>
</template>

<style scoped lang="scss"></style>
