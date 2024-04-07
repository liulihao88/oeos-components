<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <o-progress :percentage="80"></o-progress>
    <br />
    <o-progress :percentage="50" :indeterminate="true"></o-progress>
    <br />
    <o-progress type="circle" :percentage="25"></o-progress>
    <br />
    <o-progress type="circle" :percentage="60"></o-progress>
  </div>
</template>

<style scoped lang="scss"></style>
