<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <OItem label="label" value="value" src="https://img.yzcdn.cn/vant/logo.png"></OItem>
    <hr />
    <OItem label="label" value="value"></OItem>
    <o-title title="插槽用法" tb="8"></o-title>
    <OItem class="abc">
      <template #img>
        <img src="https://img.yzcdn.cn/vant/logo.png" />
      </template>
      <template #label>label</template>
      <template #value>value</template>
    </OItem>
  </div>
</template>

<style lang="scss" scoped></style>
