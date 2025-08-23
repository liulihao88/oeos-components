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

    <br />
    <el-tag type="warning" effect="dark">警告2</el-tag>
    <el-tag type="info" effect="dark">未知2</el-tag>
  </div>
</template>
