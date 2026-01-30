<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
</script>

<template>
  <div>
    <o-tooltip width="1200px" placement="right" class="m-20">
      <o-icon name="plus"></o-icon>
      <template #content>我是slot为content内容</template>
    </o-tooltip>
  </div>
</template>

<style scoped lang="scss"></style>
