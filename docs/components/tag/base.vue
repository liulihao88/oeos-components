<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <OTag class="m-r-8" type="primary">默认</OTag>
    <OTag class="m-r-8" type="warning">警告</OTag>
    <OTag class="m-r-8" type="danger">危险</OTag>
    <OTag class="m-r-8" type="info">未知</OTag>
  </div>
</template>
