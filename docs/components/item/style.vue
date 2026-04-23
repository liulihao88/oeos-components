<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <OItem
      label="label"
      value="value"
      src="https://img.yzcdn.cn/vant/logo.png"
      style="background: lightblue"
      :labelStyle="{ fontSize: '40px', color: 'red' }"
      :valueStyle="{ fontSize: '30px', color: 'var(--blue)' }"
    ></OItem>
  </div>
</template>

<style lang="scss" scoped></style>
