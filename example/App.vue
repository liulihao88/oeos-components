<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <div>src/App.vue</div>
    <o-test></o-test>
  </div>
</template>

<style scoped lang="scss"></style>
