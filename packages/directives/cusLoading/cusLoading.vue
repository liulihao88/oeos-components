<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const loadingText = ref('正在载入...')
const setLoadingText = (val) => {
  console.log(`98 val`, val);
  loadingText.value = val
}
defineExpose({
  setLoadingText,
  loadingText,
})
</script>

<template>
  <div class="cus-loading">
    <div class="cus-loading-content">
      <img src="./loading.png" class="w-24 h-24" />
      <p class="desc">{{ loadingText }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cus-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  .cus-loading-content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    .desc {
      line-height: 20px;
      color: var(--blue);
    }
    img {
      animation: spin 2s linear infinite;
    }
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
