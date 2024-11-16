<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const options = ref([
  { label: '张三', value: 'z3' },
  { label: '李四', value: 'l4' },
  { label: '王五', value: 'w5' },
])
const selectValue = ref()
const selectValue2 = ref()
const selectValue3 = ref([])
const changeSelect = (...rest) => {
  console.log(`44 rest`, rest)
  console.log('changeSelect')
}

const change = (...rest) => {
  console.log('change', rest)
}

const options2 = ref(['男人', '女人', '太监'])
</script>

<template>
  <div>
    <o-select v-model="selectValue" :options="options" @changeSelect="changeSelect" @change="change" />

    <o-select v-model="selectValue2" :options="options2" type="simple" @changeSelect="changeSelect" @change="change" />

    <o-select
      v-model="selectValue3"
      :options="options"
      multiple
      @changeSelect="changeSelect"
      @change="change"
      title="你好"
    />
  </div>
</template>
