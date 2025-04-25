<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const options = ref([
  { label: '张三', value: 'z3' },
  { label: '李四', value: 'l4' },
  { label: '王五', value: 'w5' },
])
const selectValue = ref([])
const selectValue2 = ref([])
const optionsDisabled = (item, index) => {
  return index % 2 === 0
}
const optionsDisabled2 = (item, index) => {
  return index % 2 !== 0
}

const options2 = ref(['男人', '女人', '爱情'])
</script>

<template>
  <div>
    <o-select v-model="selectValue" :options="options" multiple :optionsDisabled="optionsDisabled" title="多选正常" />

    <o-select
      v-model="selectValue2"
      :options="options2"
      multiple
      type="simple"
      :optionsDisabled="optionsDisabled2"
      title="多选简单"
    />
  </div>
</template>
