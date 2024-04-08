<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const selectedOptions = ref([])
const options = [
  {
    value: 'beijing',
    label: '北京',
    children: [
      {
        value: 'dongcheng',
        label: '东城区',
      },
      {
        value: 'xicheng',
        label: '西城区',
      },
      {
        value: 'chaoyang',
        label: '朝阳区',
      },
    ],
  },
  {
    value: 'shanghai',
    label: '上海',
    children: [
      {
        value: 'huangpu',
        label: '黄浦区',
      },
      {
        value: 'xuhui',
        label: '徐汇区',
      },
      {
        value: 'jingan',
        label: '静安区',
      },
    ],
  },
]
function handleCascaderChange(value) {
  console.log(value)
}
</script>

<template>
  <div>
    <el-cascader
      v-model="selectedOptions"
      :options="options"
      @change="handleCascaderChange"
      placeholder="请选择省市区"
    ></el-cascader>
  </div>
</template>

<style scoped lang="scss"></style>
