<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <o-progress :percentage="80"></o-progress>
    <br />
    <o-progress :percentage="50" :indeterminate="true" color="blue" ></o-progress>
    <br />
    <o-progress :percentage="50" :indeterminate="true"  :stroke-width="10" :show-text="false"></o-progress>
    <br />
    <o-progress type="circle" :percentage="25"></o-progress>
    <br />
    <o-progress type="circle" :percentage="60" :stroke-width="10"></o-progress>
  </div>
</template>

<style scoped lang="scss"></style>
