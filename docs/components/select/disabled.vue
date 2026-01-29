<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const options = ref([
  { label: '张三', value: 'z3' },
  { label: '李四', value: 'l4' },
  { label: '王五', value: 'w5' },
  { label: '赵六', value: 'z6' },
])
const selectValue1 = ref([])
const selectValue2 = ref([])
const selectValue3 = ref([])
const selectValue4 = ref([])
const itemDisabled = (item, index) => {
  return index % 2 === 0
}
const itemDisabled2 = (item, index) => {
  return index % 2 !== 0
}

const options2 = ref(['男人', '女人', '爱情'])
</script>

<template>
  <div>
    <o-select v-model="selectValue1" :options="options" :itemDisabled="itemDisabled" title="单选正常" />
    <o-select v-model="selectValue2" :options="options2" :itemDisabled="itemDisabled2" type="simple" title="单选简单" />
    <o-select v-model="selectValue3" :options="options" multiple :itemDisabled="itemDisabled" title="多选正常" />

    <o-select
      v-model="selectValue4"
      :options="options2"
      multiple
      type="simple"
      :itemDisabled="itemDisabled2"
      title="多选简单"
    />
  </div>
</template>
