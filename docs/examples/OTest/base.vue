<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
function close() {
  proxy.$toast(iptValue.value)
  console.log(`14 iptValue.value`, iptValue.value)
}
const iptValue = ref('')
</script>

<template>
  <div>
    <o-input v-model.trim.number="iptValue" title="andy"></o-input>

    <!-- <el-input v-model.trim="iptValue" :precision="0" /> -->

    <el-button type="primary" @click="close">测试12</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
