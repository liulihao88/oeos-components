<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const size = ref('default')
</script>

<template>
  <div>
    <o-radio v-model="size" :options="['large', 'default', 'small']" type="simple"></o-radio>
    <OBasicLayout :size="size">
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
