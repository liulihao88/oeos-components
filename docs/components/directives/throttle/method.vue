<template>
  <div>
    <div class="bg-white p" v-throttle="($event) => handleEvent($event, '其他传参')">
      可以传参的
    </div>
    <div v-throttle.click.scroll.1000="handleEvent" class="h-300 o-a cp">
      <h1>这里, click和scroll事件, 都添加了500毫秒的节流</h1>
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
  </div>
</template>

<script setup lang="ts">
function handleEvent(evt, ...rest) {
  console.log(`72 evt`, evt)
  console.log(`39 rest`, rest)
}
</script>
