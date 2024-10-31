<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <o-title title="你好"></o-title>
    <o-title title="无左侧树杠" type="simple"></o-title>
    <o-title title="你好2" inner subTitle="我不服啊">
      我是左侧
      <template #right>
        <div class="w-600">我是右侧的slot</div>
      </template>
    </o-title>
    不行啊弟弟
  </div>
</template>
