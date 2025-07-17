<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <oItemWrapper gap="20px" :columns="3">
    <OItem label="label" value="value" src="https://img.yzcdn.cn/vant/logo.png"></OItem>
    <!-- <div>123</div> -->
    <OItem label="label" value="value"></OItem>
    <OItem label="label" value="value"></OItem>
    <OItem label="label" value="value"></OItem>
    <OItem label="label" value="value"></OItem>
    <OItem label="label" value="value"></OItem>
    <OItem label="label" value="value"></OItem>
  </oItemWrapper>
</template>

<style lang="scss" scoped></style>
