<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const options = ref([
  { label: '张三', value: 'z3' },
  { label: '李四', value: 'l4' },
  { label: '王五', value: 'w5' },
  { label: '王五', value: 'w5' },
  {
    label:
      'w52024-07-232024-07-23 19:22:19I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. have a nice day!',
    value:
      'w52024-07-232024-07-23 19:22:19I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. have a nice day!',
  },
  { label: '王五', value: 'w5' },
  { label: '王五', value: 'w5' },
  { label: '王五', value: 'w5' },
  { label: '王五', value: 'w5' },
  { label: '王五', value: 'w5' },
])

const options1 = ref([
  {
    label:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga a eveniet corporis, maiores ab laboriosam eligendi quia ex atque aspernatur odit sint numquam assumenda impedit voluptas reiciendis inventore eos veniam!',
    value:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga a eveniet corporis, maiores ab laboriosam eligendi quia ex atque aspernatur odit sint numquam assumenda impedit voluptas reiciendis inventore eos veniam!',
  },
])
</script>

<template>
  <div>
    <o-descriptions :options="options1" :column="1" showAll label-width="200"></o-descriptions>
    <hr />
    <o-descriptions extra="这是extra" title="这是title" :options="options" class="w-100%" showAll></o-descriptions>
    <hr />
  </div>

  <el-descriptions>
    <el-descriptions-item v-for="(v, i) in options" :key="v.value" :label="v.label">
      {{ v.value }}
    </el-descriptions-item>
  </el-descriptions>
</template>
