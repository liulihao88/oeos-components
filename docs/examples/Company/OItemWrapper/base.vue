<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <oItemWrapper>
    <OItem label="label" value="value" src="https://img.yzcdn.cn/vant/logo.png"></OItem>
    <OItem label="label" value="value"></OItem>
  </oItemWrapper>
  <oTitle title="更改间距大小" tb="16"></oTitle>
  <oItemWrapper gap="5%">
    <OItem label="label" value="value" src="https://img.yzcdn.cn/vant/logo.png"></OItem>
    <OItem label="label" value="value"></OItem>
    <OItem label="label" value="value"></OItem>
    <OItem label="label" value="value"></OItem>
    <div class="bg-white h-100% last-child">
      我也能凑凑热闹
      <!-- <div>我就不行了</div> -->
    </div>
  </oItemWrapper>
</template>

<style lang="scss" scoped>
.last-child {
  flex: 1; /* Ensure the last child takes up the full height */
  display: flex; /* Ensure the last child is a flex container */
  flex-direction: column; /* Stack children vertically */
  justify-content: center; /* Center children vertically */
  align-items: center; /* Center children horizontally */
}
</style>
