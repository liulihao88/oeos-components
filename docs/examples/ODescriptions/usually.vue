<script setup lang="tsx">
import { ref, getCurrentInstance, computed } from 'vue'
const instance = getCurrentInstance()
import { formatTime, sleep } from '@oeos-components/utils'
const data: any = ref({})
const options = computed(() => {
  return [
    { label: '名1111111111111字', value: data.value.name },
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
    <div>docs/examples/ODescription/base.vue</div>
    <o-descriptions :options="options" class="w-100%" :column="1" labelWidth="auto"></o-descriptions>
  </div>
</template>
