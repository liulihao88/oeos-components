<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <OItemWrapper>
    <OItem
      label="这是默认类型"
      value="123456"
      src="https://img.yzcdn.cn/vant/logo.png"
      :imgStyle="{ height: '100px' }"
      height="300"
    ></OItem>
    <OItem
      label="这个类型是type='value'"
      type="value"
      value="123456"
      src="https://img.yzcdn.cn/vant/logo.png"
      :imgStyle="{ height: '100px' }"
      height="300"
    ></OItem>
    <OItem
      label="这个类型是type='value'且加属性"
      type="value"
      value="123456789233412"
      src="https://img.yzcdn.cn/vant/logo.png"
      :imgStyle="{ height: '100px' }"
      :attrs="{
        formatBytes: true,
        formatThousands: true,
        toFixed: true,
      }"
      height="300"
    ></OItem>
  </OItemWrapper>
</template>

<style lang="scss" scoped></style>
