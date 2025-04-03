<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <OBasicLayout>
      我是内部的文件
      <template #header>
        <o-title title="基础用法"></o-title>
      </template>
      <template #footer>
        <el-button type="primary">测试07</el-button>
        <el-button type="primary">测试07</el-button>
      </template>
    </OBasicLayout>

    <OBasicLayout
      :headerStyle="{ paddingTop: 0 }"
      class="mt2"
      :mainStyle="{ paddingLeft: 0 }"
      :footerStyle="{ paddingBottom: 0 }"
    >
      无paddingLeft
      <template #header>
        <o-title title="更改内部样式, 无paddingTop"></o-title>
      </template>
      <template #footer>
        <el-button type="primary">无paddingBottom</el-button>
      </template>
    </OBasicLayout>

  </div>
</template>
