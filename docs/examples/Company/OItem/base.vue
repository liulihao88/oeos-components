<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <OItem label="label" value="value" src="https://img.yzcdn.cn/vant/logo.png"></OItem>
    <hr />
    <OItem label="label" value="value"></OItem>
  </div>
</template>
