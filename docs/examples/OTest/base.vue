<script setup lang="ts">
const color = 'var(--red)'
const bgColor = 'yellow'
</script>

<template>
  <div>
    <div :style="{ color: color }">test/t2.vue</div>
    <div class="aa">test/t2.vue</div>
    <div class="cl-blue">你好啊</div>
    <div style="color: var(--red)">我不好</div>
  </div>
</template>

<style scoped lang="scss">
.aa {
  color: v-bind(color);
  background-color: v-bind(bgColor);
}
</style>
