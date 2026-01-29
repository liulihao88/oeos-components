<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const baseIptValue = ref()
const inputValue = ref()
function baseThrottle() {
  console.log('baseThrottle')
}
function throttle3000() {
  console.time('3000毫秒throttle')
  console.log('throttle3000')
  console.timeEnd('3000毫秒throttle')
}
function inputChange() {
  console.log(`inputValue.value`, inputValue.value)
}

</script>

<template>
  <div>
    <!-- <el-input v-throttle v-model="baseIptValue" @input="inputChange" /> -->
    <el-input v-throttle="inputChange" v-model="inputValue" />
    <o-input v-model="inputValue" v-throttle="inputChange" />
    <div class="mb3 bg-white p" v-throttle="baseThrottle">默认1000毫秒</div>
    <el-button v-throttle.3000="throttle3000">这是3000毫秒的</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
