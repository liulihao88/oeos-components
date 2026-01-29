<script setup lang="tsx">
import { ref, getCurrentInstance, computed } from 'vue'
const instance = getCurrentInstance()
import { formatTime, sleep } from '@oeos-components/utils'
const data: any = ref({})
const sizeValue = ref('default')
const showAll = ref(false)
const options = computed(() => {
  return [
    {
      label: '名11字',
      value: data.value.name,
      attrs: {
        'label-align': 'left',
        align: 'center',
        'label-class-name': 'my-label',
        'class-name': 'my-content',
      },
    },
    {
      label: '时间',
      value: data.value.time,
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
    {
      label: '超出文本超出文本超出文本超出文本超出文本',
      value: data.value.more,
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
    isLock: false,
    more: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit et, repudiandae ex impedit ullam eveniet possimus at, in aspernatur blanditiis neque quibusdam est nulla minus error quis doloribus labore doloremque?',
  }
}
init()
</script>

<template>
  <div>
    <o-flex direction="column">
      <o-radio :options="sizeOptions" v-model="sizeValue"></o-radio>
      <o-radio
        :options="[
          { label: '有border', value: true },
          { label: '无border', value: false },
        ]"
        v-model="borderValue"
      ></o-radio>
      <o-radio
        :options="[
          { label: 'showAll为true', value: true },
          { label: 'showAll为false', value: false },
        ]"
        v-model="showAll"
      ></o-radio>
    </o-flex>
    <o-descriptions
      title="这是title"
      :options="options"
      class="w-100%"
      :column="1"
      label-width="300"
      :size="sizeValue"
      :showAll="showAll"
      :border="borderValue"
      extra="这是extra"
    ></o-descriptions>
  </div>
</template>

<style lang="scss" scoped>
:deep(.my-label) {
  background: var(--el-color-success-light-9) !important;
}
:deep(.my-content) {
  background: var(--el-color-danger-light-9);
}
</style>
