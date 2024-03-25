<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { $toast } from '@/utils/index.js'

const { proxy } = getCurrentInstance()
$toast('Hello World1111');
proxy.$toast("保存成功");
</script>

<template>
  <div>
    <o-empty></o-empty>
  </div>
</template>

<style scoped lang="scss"></style>
