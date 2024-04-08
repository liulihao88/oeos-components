<template>
  <div>
    <h4>自定义单个选项插槽</h4>
    <o-checkbox v-model="value" :options="options" size="large">
      <template #mySlot="scope">
        <div>自定义单个选项插槽---{{ scope.label }}---{{ scope.value }}</div>
      </template>
    </o-checkbox>
  </div>
  <div>
    <h4>使用customLabel显示的文本</h4>
    <o-checkbox
      v-model="value"
      :options="options"
      size="large"
      :customLabel="(item) => `${item.label}--${item.value}`"
    ></o-checkbox>
  </div>
  <div>
    <h4>
      默认插槽(由于默认插槽, 是取的label作为值, 所以无法跟全选联通,
      必须将全选隐藏)
    </h4>
    <o-checkbox v-model="value2" size="small" :showAll="false">
      <el-checkbox label="上海" />
      <el-checkbox label="北京" />
      <el-checkbox label="广州" />
      <el-checkbox label="深圳" />
    </o-checkbox>
    <br />
    <o-checkbox v-model="value2" size="large" :showAll="false">
      <el-checkbox-button label="上海" />
      <el-checkbox-button label="北京" />
      <el-checkbox-button label="广州" />
      <el-checkbox-button label="深圳" />
    </o-checkbox>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref([])

const value2 = ref(['上海', '北京'])
const options = ref([
  { label: '小月月', value: 'xyy' },
  { label: '小鑫鑫', value: 'xxx', slot: 'mySlot' },
])
</script>
