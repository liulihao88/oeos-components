<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const options = ref([
  { label: '张三', value: 'z3' },
  { label: '李四', value: 'l4' },
  { label: '王五', value: 'w5' },
  { label: '王五', value: 'w5' },
  {
    label: 'w52024-07-232024-07-23 19:22:19I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. have a nice day!',
    value:
      'w52024-07-232024-07-23 19:22:19I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. have a nice day!',
  },
  { label: '王五', value: 'w5' },
  { label: '王五', value: 'w5' },
  { label: '王五', value: 'w5' },
  { label: '王五', value: 'w5' },
  { label: '王五', value: 'w5' },
])
</script>

<template>
  <div>
    <div>docs/examples/ODescription/base.vue</div>
    <o-descriptions extra="321" title="你瞅啥" :options="options" class="w-100%" showAll></o-descriptions>

    <el-descriptions>
      <el-descriptions-item label="左侧">右侧</el-descriptions-item>
      <el-descriptions-item label="左侧">
        w52024-07-232024-07-23 19:22:19I want to set some random text, if you like it , please tell me. good wish for
        you! thank you so much. have a nice day!
      </el-descriptions-item>
      <el-descriptions-item label="左侧">
        w52024-07-232024-07-23 19:22:19I want to set some random text, if you like it , please tell me. good wish for
        you! thank you so much. have a nice day! w52024-07-232024-07-23 19:22:19I want to set some random text, if you
        like it , please tell me. good wish for you! thank you so much. have a nice day! w52024-07-232024-07-23
        19:22:19I want to set some random text, if you like it , please tell me. good wish for you! thank you so much.
        have a nice day!
      </el-descriptions-item>
      <el-descriptions-item label="左侧">
        w52024-07-232024-07-23 19:22:19I want to set some random text, if you like it , please tell me. good wish for
        you! thank you so much. have a nice day!
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
