<script setup lang="tsx">
import { ref, getCurrentInstance, computed } from 'vue'
const instance = getCurrentInstance()
import { formatTime, sleep } from '@oeos-components/utils'
const data: any = ref({})
const sizeValue = ref('default')
const options = computed(() => {
  return [
    { label: '名11字', value: data.value.name },
    {
      label: '时间',
      value: () => {
        return formatTime(data.value.time)
      },
    },
    {
      label: 'filter的时间',
      value: data.value.time,
      filter: (val) => formatTime(val),
    },
    {
      label: '是否锁定',
      render: () => {
        if (data.value.isLock) {
          return <o-icon name="lock"></o-icon>
        } else {
          return <o-icon name="unlock"></o-icon>
        }
      },
    },
  ]
})

const sizeOptions = [
  {
    label: 'large',
    value: 'large',
  },
  {
    label: 'default',
    value: 'default',
  },
  {
    label: 'small',
    value: 'small',
  },
]

const borderValue = ref(true)

const init = async () => {
  await sleep(1000)
  data.value = {
    name: 'andy',
    time: 1638720415900,
    isLock: true,
  }
}
init()
</script>

<template>
  <div>
    <o-radio :options="sizeOptions" v-model="sizeValue"></o-radio>
    <br />
    <o-radio
      :options="[
        { label: '有border', value: true },
        { label: '无border', value: false },
      ]"
      v-model="borderValue"
    ></o-radio>
    <o-descriptions
      title="这是title"
      :options="options"
      class="w-100%"
      :column="1"
      labelWidth="auto"
      :size="sizeValue"
      :border="borderValue"
      extra="这是extra"
    ></o-descriptions>
  </div>
</template>
