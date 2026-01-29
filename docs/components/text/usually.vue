<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <div>docs/examples/OText/usually.vue</div>
    <o-text style="width: 100px">
       测试文本，这是一个稍微有点长的文本，过长省略后，鼠标悬浮会有tooltip提示
    </o-text>
  </div>
</template>

<style scoped lang="scss"></style>