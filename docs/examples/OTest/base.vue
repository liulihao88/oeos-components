<template>
  <!-- <div v-tt.scroll="[handleEvent, 4100]"  class="h-300 o-a"> -->
  <div v-tt.click.scroll.500="() => handleEvent(123)" class="h-300 o-a cp">
    Scroll or click me
    <el-button type="primary" v-tt="handleEvent" @click.stop>测试25</el-button>
    <h1>
      2024-05-28 11:17:06I want to set some random text, if you like it , please tell me. good wish for you! thank you
      so much. have a nice day!
    </h1>
    <h1>
      2024-05-28 11:17:06I want to set some random text, if you like it , please tell me. good wish for you! thank you
      so much. have a nice day!
    </h1>
    <h1>
      2024-05-28 11:17:06I want to set some random text, if you like it , please tell me. good wish for you! thank you
      so much. have a nice day!
    </h1>
    <h1>
      2024-05-28 11:17:06I want to set some random text, if you like it , please tell me. good wish for you! thank you
      so much. have a nice day!
    </h1>
  </div>
</template>

<script setup lang="ts">
function handleEvent(evt) {
  console.log(`72 evt`, evt)
  console.log('handleEvent1111')
}
</script>
