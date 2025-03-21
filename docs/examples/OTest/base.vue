<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <o-title title="closeOnClickModal">
    <el-button type="primary" @click="isTest28">测试35</el-button>
    <el-button type="primary" @click="isTest28">测试35</el-button>
  </o-title>
</template>
