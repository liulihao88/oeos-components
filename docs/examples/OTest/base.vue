<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

const cc = ref()
</script>

<template>
  <div>
    <div>docs/examples/OTest/base.vue</div>
    <o-input v-model="cc" v-number :min="1" length="3" :maxlength="4" placeholder="你瞅啥"  />
    <o-input v-model="cc" :maxlength="4" />
  </div>
</template>
