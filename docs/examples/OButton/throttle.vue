<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { $toast } from '@oeos-components/utils'

const timeValue = ref(1000)
const handleClick = () => {
  $toast('handleClick')
}
</script>

<template>
  <div>
    <o-switch v-model="timeValue" active-text="防抖" inactive-text="防抖" :active-value="1000" :inactive-value="0" />
    <o-button :time="timeValue" @click="handleClick" icon="plus">1秒防抖</o-button>
    <o-button :loading="false" :time="timeValue" @click="handleClick">一秒防抖, 但不显示loading</o-button>
  </div>
</template>
