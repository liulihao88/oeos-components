<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
function close() {
  console.log('close')
}
const iptValue = ref()
</script>

<template>
  <div>
    <o-input
      title="想天下"
      v-model="iptValue"
      width="500"
      size="default"
      :titleAttrs="{
        onClick: close,
        style: { color: 'blue' },
      }"
      class="m-l-100 bg-red"
    ></o-input>
  </div>
</template>

<style scoped lang="scss"></style>
