<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const handleClick = () => {
  console.log("handleClick");
}
</script>

<template>
  <div>
    <o-button content="我是提示文字" icon="plus" @click="handleClick">有提示</o-button>
  </div>
</template>
