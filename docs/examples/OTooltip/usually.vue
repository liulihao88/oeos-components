<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
function handleClick() {
  console.log('handleClick')
}
</script>

<template>
  <div>
    <o-tooltip
      content="这里是需要显示的文本内容，当文本超出时会显示完整内容"
      width="200px"
      placement="bottom"
      class=""
      @click="handleClick"
      :tooltipAttrs="{
        effect: 'light',
      }"
    ></o-tooltip>
    <div>
      <o-tooltip
        content="这里没超出就不显示tooltip"
        width="200px"
        placement="bottom"
        class=""
        @click="handleClick"
      ></o-tooltip>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
