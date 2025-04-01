<script setup lang="ts" name="OBasicLayout">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div class="basic-layout-box">
    <div class="header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="main">
      <slot></slot>
    </div>
    <div class="footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.basic-layout-box {
  background: #fff;
  border: 1px solud var(--line);
  border-radius: 4px;
  .header {
    padding: 16px;
    border-bottom: 1px solid var(--line);
  }
  .main {
    padding: 16px;
  }
  .footer {
    border-top: 1px solid var(--line);
    padding: 16px;
  }
}
</style>
