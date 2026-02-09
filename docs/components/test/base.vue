<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <img src="/img/logo.svg" class="br-50% w-30" />
    <img src="../../packages/components/title/src/title.svg" class="br-50% w-30" />
    <img src="@/components/title/src/logo.svg" class="br-50% w-30" />
  </div>
</template>
