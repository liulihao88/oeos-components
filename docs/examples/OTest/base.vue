<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
function close() {
  proxy.$toast(iptValue.value)
  console.log(`14 iptValue.value`, iptValue.value);
}
const iptValue = ref('')
</script>

<template>
  <div>
    <o-input v-model="iptValue"></o-input>

    <el-button type="primary" @click="close">测试12</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
