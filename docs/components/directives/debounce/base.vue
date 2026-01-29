<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const inputValue = ref()
function baseDebounce() {
  console.log('baseDebounce')
}
function debounce3000() {
  console.log('debounce3000')
}
function debounce200() {
  console.log('debounce200')
}
function inputChange() {
  console.log(`inputValue.value`, inputValue.value)
}
</script>

<template>
  <div>
    <el-input v-debounce="inputChange" v-model="inputValue" disabled />
    <div class="mb3 bg-white p" v-debounce="baseDebounce">默认1000毫秒</div>
    <button class="mb3 bg-white p d-b" v-debounce.200="debounce200">这是200毫秒的</button>
    <el-button v-debounce.3000="debounce3000">这是3000毫秒的</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
