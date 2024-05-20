<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

function confirm() {
  console.log('confirm')
}
</script>

<template>
  <div>
    <o-popconfirm @confirm="confirm"></o-popconfirm>
  </div>
</template>

<style scoped lang="scss"></style>
