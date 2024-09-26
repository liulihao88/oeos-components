<script setup lang="ts">
import { ref, getCurrentInstance, computed } from 'vue'
const { proxy } = getCurrentInstance()
const data = ref({})
const options = computed(() => {
  return [
    { label: '名1111111111111字', value: data.value.name },
    {
      label: '时间',
      value: () => {
        return proxy.formatTime(data.value.time)
      },
    },
  ]
})

const init = async () => {
  await proxy.sleep(1000)
  data.value = {
    name: 'andy',
    time: 1638720415900,
  }
}
init()
</script>

<template>
  <div>
    <div>docs/examples/ODescription/base.vue</div>
    <o-description :options="options" class="w-100%"></o-description>
  </div>
</template>
