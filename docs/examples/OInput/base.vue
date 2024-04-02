<script setup lang="ts">
import { ref } from 'vue'
const iptValue = ref(
  'I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!  ',
)
</script>

<template>
  <div>
    <o-input v-model="iptValue"></o-input>
    <o-input v-model="iptValue" width="100"></o-input>
    <o-input v-model="iptValue" :clearble="false"></o-input>
    <o-input v-model="iptValue" title="title"></o-input>
  </div>
</template>

<style scoped lang="scss"></style>
