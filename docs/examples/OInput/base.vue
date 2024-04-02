<script setup lang="ts">
import { ref } from 'vue'
const iptValue = ref(
  'I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!  ',
)
</script>

<template>
  <div>
    <o-input
      v-model="iptValue"
      style="width: 200px; display: inline-block"
    ></o-input>
    <o-input
      class="w-100 d-ib"
      v-model="iptValue"
      style="width: 200px; display: inline-block"
    ></o-input>
  </div>
</template>

<style scoped lang="scss"></style>
