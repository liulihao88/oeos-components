<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <oItemWrapper class="w-100%">
    <OItem label="label" value="value" src="https://img.yzcdn.cn/vant/logo.png"></OItem>
    <OItem label="label" value="value" src="https://img.yzcdn.cn/vant/logo.png"></OItem>
    <OItem label="label" value="value" src="https://img.yzcdn.cn/vant/logo.png"></OItem>
  </oItemWrapper>

  <br />

  <oItemWrapper class="w-100%">
    <el-button type="primary">测试98</el-button>
    <el-button type="primary">测试98</el-button>
    <el-button type="primary">测试98</el-button>
  </oItemWrapper>
</template>
