<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import address from './pca-code.json'
const { proxy } = getCurrentInstance()
const props = defineProps({
  width: {
    type: [String, Number],
    default: '',
  },
})
function handleCascaderChange(value) {
  console.log(value)
}
const optionsProps = {
  label: 'name',
  value: 'code',
  expandTrigger: 'hover',
}
</script>

<template>
  <div>
    <el-cascader
      :options="address"
      :style="{ ...proxy.processWidth(props.width) }"
      @change="handleCascaderChange"
      placeholder="请选择省市区"
      :props="optionsProps"
      v-bind="$attrs"
    ></el-cascader>
  </div>
</template>

<style scoped lang="scss"></style>
