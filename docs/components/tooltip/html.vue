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
        我爱你啊1111 <br>这里使用 &lt; br &gt;进行换行 <div>或者直接使用块级元素进行换行</div>"
    >
      这里显示内容
    </o-tooltip>
  </div>
</template>
