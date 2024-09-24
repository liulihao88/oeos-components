<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const checkboxValue = ref(false)
const options = ref([
  { label: '小月月', value: false },
  // { label: '小鑫鑫', value: 'xxx' },
  // { label: '小瑞瑞', value: 'xrr' },
])
const cc = ref()
</script>

<template>
  <div>
    <o-input v-model="cc" v-number min="1" max="100" />
  </div>
</template>

<style scoped lang="scss"></style>
