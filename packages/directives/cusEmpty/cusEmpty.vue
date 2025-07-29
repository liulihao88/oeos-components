<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { processWidth } from '@/utils/src'
import group_null from '@/assets/images/group_null.png'
const loadingText = ref('暂无数据')
const setLoadingText = (val) => {
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
      <img
        :src="group_null"
        :style="{
          width: '40px',
        }"
      />
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
      color: var(--45);
    }
  }
}
</style>
