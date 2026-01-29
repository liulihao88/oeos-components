<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <oItemWrapper>
    <OItem label="label" value="value" src="https://img.yzcdn.cn/vant/logo.png"></OItem>
    <OItem label="label" value="value"></OItem>
  </oItemWrapper>
</template>
