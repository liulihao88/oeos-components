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
      title="名字"
      v-model="iptValue"
      width="500"
      placeholder="请输入名字"
      size="default"
      :titleAttrs="{
        onClick: close,
        style: {
          color: 'blue',
          fontSize: '10px',
          fontWeight: 'bold',
        },
      }"
      class="m-l-100 bg-red"
    ></o-input>
  </div>
</template>

<style scoped lang="scss"></style>
