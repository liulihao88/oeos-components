<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { throttle } from 'lodash-es'
function baseDebounce() {
  console.log('baseDebounce')
}
function debounce3000() {
  console.log('debounce3000')
}
function debounce200() {
  console.log('debounce200')
}
</script>

<template>
  <div>
    <div class="mb3 bg-white p" v-debounce="baseDebounce">默认1000毫秒</div>
    <button class="mb3 bg-white p d-b" v-debounce.200="debounce200">这是200毫秒的</button>
    <el-button v-debounce.3000="debounce3000">这是3000毫秒的</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
