<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <o-title title="你好"></o-title>
    <o-title title="显示左侧树杠" type=""></o-title>
    <o-title title="无左侧树杠" type="simple"></o-title>
    <o-title title="加icon和右侧slot" subTitle="我不服啊" type="simple">
      我是默认slot
      <template #icon>
        <o-icon name="delete" ></o-icon>
      </template>
      <template #right>
        <div class="w-600 tr">我是右侧的slot</div>
      </template>
    </o-title>

    <o-title title="修改竖条颜色" type="" :style="{ '--lc': 'red' }"></o-title>
  </div>
</template>
