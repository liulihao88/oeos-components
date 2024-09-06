<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const checkboxValue = ref(false)
const options = ref([
  { label: '小月月', value: false },
  // { label: '小鑫鑫', value: 'xxx' },
  // { label: '小瑞瑞', value: 'xrr' },
])
</script>

<template>
  <div>
    <!-- <o-checkbox v-model="checkboxValue" :showAll="false">你瞅啥</o-checkbox> -->

    <el-checkbox v-model="checkboxValue">备选项</el-checkbox>
  </div>
</template>

<style scoped lang="scss"></style>
