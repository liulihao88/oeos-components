<script setup lang="ts">
import { ref, watch } from 'vue'
const iptValue = ref(
  'I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!  ',
)
const textareaValue = ref(
  'I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!  I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day! I want to set some random text, if you like it , please tell me. good wish for you! thank you so much. hive a nice day!',
)
console.log(`82 iptValue`, iptValue)
watch(
  iptValue,
  (val) => {
    console.log(`67 10行 docs/examples/OInput/base.vue val`, val)
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<template>
  <div>
    <el-input v-model="iptValue" class="mb"></el-input>
    <o-input v-model="iptValue"></o-input>
    <o-input v-model="iptValue" width="100%" v-number min="100" max="200" class="mb"></o-input>
    <o-input v-model="iptValue" width="300"></o-input>
    <o-input v-model="iptValue" width="100" v-number :max="100" :min="1"></o-input>
    <o-input v-model="iptValue" :clearble="false"></o-input>
    <o-input v-model="textareaValue" type="textarea"></o-input>
    <o-input
      v-model="iptValue"
      title="这是title"
      hideTooltip
      width="240"
      size="small"
      :boxStyle="{ width: 200 }"
    ></o-input>
    <o-input v-model="iptValue" hideTooltip width="240" size="small"></o-input>
    <o-input v-model="iptValue" hideTooltip width="240" size="default" title="这是title"></o-input>
    <o-input v-model="iptValue" hideTooltip width="240" size="large" title="这是title"></o-input>
  </div>
</template>

<style scoped lang="scss"></style>
