<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const isShow = ref(true)
</script>

<template>
  <div class="o-drawer">
    <o-dialog v-model="isShow">
      <template #footer>你瞅啥</template>
    </o-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
