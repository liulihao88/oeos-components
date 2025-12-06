<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const handleClick = () => {
  console.log('handleClick')
}
</script>

<template>
  <div>
    <o-button :time="1000" @click="handleClick">1秒防抖</o-button>
  </div>
</template>
