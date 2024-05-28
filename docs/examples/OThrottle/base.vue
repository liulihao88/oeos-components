<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { throttle } from 'lodash-es'
function baseThrottle() {
  console.log('baseThrottle')
}
function throttle3000() {
  console.time('3000毫秒throttle')
  console.log('throttle3000')
  console.timeEnd('3000毫秒throttle')
}
</script>

<template>
  <div>
    <div class="mb3 bg-white p" v-throttle="baseThrottle">默认1000毫秒</div>
    <el-button v-throttle.3000="throttle3000">这是3000毫秒的</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
