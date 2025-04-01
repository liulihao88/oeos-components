<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <OBasicLayout>
      我是内部的文件
      <template #header>
        <o-title title="我想跟过去说声抱歉"></o-title>
      </template>
      <template #footer>
        <el-button type="primary" >测试07</el-button>
        <el-button type="primary" >测试07</el-button>
      </template>
    </OBasicLayout>
  </div>
</template>
