<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div class="w-300">
    <o-tooltip
      width="200px"
      raw-content
      content=" <span class='cl-blue m-100'>我是啊</span>
        我爱你啊1111"
    >
      这里显示内容
    </o-tooltip>
  </div>
</template>
