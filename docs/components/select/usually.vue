<script setup lang="ts">
import { ref, getCurrentInstance, watch, provide } from 'vue'
const { proxy } = getCurrentInstance()

// main.js
provide('GLOBAL_COMPONENT_CONFIG', {
  oSelect: {
    showPrefix: true,
  },
})

const selectVal = ref('xxx')
const options = ref([
  { name: '小瑞瑞', id: 'xrr' },
  { name: '小月月', id: 'xyy', disabled: true },
  { name: '小鑫鑫', id: 'xxx' },
])
const baseOptions = ref([
  { label: 'andy', value: 1 },
  { label: '凌云', value: 2, disabled: true },
])

const checkAll = ref(false)
const indeterminate = ref(false)
const value = ref([])
const cities = ref([
  {
    value: 'Beijing',
    label: 'Beijing',
  },
  {
    value: 'Shanghai',
    label: 'Shanghai',
  },
  {
    value: 'Nanjing',
    label: 'Nanjing',
  },
  {
    value: 'Chengdu',
    label: 'Chengdu',
  },
  {
    value: 'Shenzhen',
    label: 'Shenzhen',
  },
  {
    value: 'Guangzhou',
    label: 'Guangzhou',
  },
])

watch(value, (val) => {
  if (val.length === 0) {
    checkAll.value = false
    indeterminate.value = false
  } else if (val.length === cities.value.length) {
    checkAll.value = true
    indeterminate.value = false
  } else {
    indeterminate.value = true
  }
})

const handleCheckAll = (val) => {
  indeterminate.value = false
  if (val) {
    value.value = cities.value.map((_) => _.value)
  } else {
    value.value = []
  }
}
</script>

<template>
  <div>
    <o-flex direction="column" gap="8">
      <o-select v-model="selectVal" :options="options" label="name" value="id" title="value和label分别设置"></o-select>
      <o-select
        title="有禁用状态"
        v-model="selectVal"
        :options="baseOptions"
        :itemDisabled="(item) => item.disabled"
      ></o-select>
  
    </o-flex>

    <o-title title="禁用状态, 可清空" sub-title="disabled, clearable" t="10">
      <o-select v-model="selectVal" :options="baseOptions" size="large" disabled clearable></o-select>
    </o-title>
    <o-title title="自定义下拉框菜单的头部和底部" sub-title="slot 中的header 和 footer" t="10">
      <o-select v-model="selectVal" :options="baseOptions" size="large">
        <template #header>我来组成头部</template>
        <template #default="{ options, item }">
          <span>{{ item.label }}</span>
          <span class="cl-red">--------{{ item.value }}</span>
        </template>
        <template #footer>我来组成底部</template>
      </o-select>
    </o-title>

    
  </div>
</template>

<style scoped lang="scss"></style>
