<script setup lang="ts" name="OChooseArea">
import { ref, getCurrentInstance } from 'vue'
import address from './pca-code.json'
import { processWidth } from '@/utils/src'
const props = defineProps({
  width: {
    type: [String, Number],
    default: '',
  },
})
function handleCascaderChange(value) {}
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
      :style="{ ...processWidth(props.width) }"
      @change="handleCascaderChange"
      placeholder="请选择省市区"
      :props="optionsProps"
      v-bind="$attrs"
    ></el-cascader>
  </div>
</template>

<style scoped lang="scss"></style>
