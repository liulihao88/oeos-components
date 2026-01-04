<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { $toast } from '@oeos-components/utils'
const handleClick = () => {
  $toast('handleClick')
}
</script>

<template>
  <div>
    <o-button :time="1000" @click="handleClick" icon="plus">1秒防抖</o-button>
    <o-button :loading="false" :time="1000" @click="handleClick">一秒防抖, 但不显示loading</o-button>
  </div>
</template>
