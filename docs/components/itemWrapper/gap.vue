<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <oItemWrapper gap="5%">
    <OItem label="label" value="value" src="https://img.yzcdn.cn/vant/logo.png"></OItem>
    <OItem label="label" value="value"></OItem>
    <OItem label="label" value="value"></OItem>
    <OItem label="label" value="value"></OItem>
    <!-- <div>123</div> -->
    <div class="bg-white">
      我也能凑凑热闹
    </div>
  </oItemWrapper>
</template>

<style lang="scss" scoped>
</style>
