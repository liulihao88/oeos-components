<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const cc = ref()
</script>

<template>
  <div>
    <div>docs/examples/OTest/base.vue</div>
    <o-input v-model="cc" v-number :max="10333" />
  </div>
</template>
