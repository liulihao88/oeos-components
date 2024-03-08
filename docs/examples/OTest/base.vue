<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

const arr = ref([
  { label: '小月月', value: 'xyy' },
  { label: '小鑫鑫', value: 'xxx' },
])

const arr2 = proxy.clone(arr)
</script>

<template>
  <div>
    <div>docs/examples/Otest/base.vue</div>
    {{ arr }}
    <br />
    {{ arr2 }}
  </div>
</template>

<style scoped lang="scss"></style>
