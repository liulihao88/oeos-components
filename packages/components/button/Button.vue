<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
function isTest53() {
}
</script>

<template>
  <el-button @click="isTest53">
    <slot></slot>
  </el-button>
</template>

<style scoped lang="scss"></style>
