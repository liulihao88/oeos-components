<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const isShow = ref(false)
function btnClick() {
  isShow.value = true
}
</script>

<template>
  <div>
    <el-button @click="btnClick" type="primary">打开drawer</el-button>
    <o-drawer title="baseDrawer" v-model="isShow">
      我是drawer的基础用法
    </o-drawer>
  </div>
</template>

<style scoped lang="scss"></style>
