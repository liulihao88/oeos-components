<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <o-empty
      description="我是空白的"
      src="https://atts.w3cschool.cn/rabbit600x600.png"
    ></o-empty>
  </div>
</template>

<style scoped lang="scss"></style>
