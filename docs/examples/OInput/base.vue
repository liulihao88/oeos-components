<script setup lang="ts">
import { ref } from 'vue'
const iptValue = ref(
  'I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!  ',
)
const textareaValue = ref(
  'I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!  I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day! I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!',
)
</script>

<template>
  <div>
    <o-input v-model="iptValue"></o-input>
    <o-input v-model="iptValue" width="300"></o-input>
    <o-input v-model="iptValue" width="100" v-number min="100" max="200"></o-input>
    <o-input v-model="iptValue" :clearble="false"></o-input>
    <o-input v-model="iptValue" title="title" hideTooltip></o-input>
    <o-input v-model="textareaValue" type="textarea"></o-input>
  </div>
</template>

<style scoped lang="scss"></style>
