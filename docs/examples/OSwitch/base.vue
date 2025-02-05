<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const cc = ref(false)
</script>

<template>
  <div>
    <o-switch v-model="cc"></o-switch>
    <br />

    <o-switch v-model="cc" active-text="这是active的value"></o-switch>
    <br />
    <o-switch v-model="cc" active-text="这是active的text" inactive-text="这是inactive的text"></o-switch>
  </div>
</template>
