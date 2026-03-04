<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import * as icons from '@element-plus/icons-vue'
function copyIcon(name) {
  console.log(`1105 6行 docs/examples/OIcon/usually.vue name `, name)
  let res = `<o-icon name="${proxy.toLine(name)}"></o-icon>`
  proxy.copy(res, { duration: 500 })
}
</script>

<template>
  <div class="icon-box">
    <template v-for="(v, i) in icons" :key="i">
      <div class="box-inner" @click="copyIcon(v.name)">
        <o-icon :name="`${proxy.toLine(v.name)}`" class="item"></o-icon>
        <div>{{ v.name }}</div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.icon-box {
  display: flex;
  align-items: center;
  // flex-direction: column;
  flex-wrap: wrap;
  .box-inner {
    display: flex;
    width: 50px;
    align-items: center;
    flex-direction: column;
    margin: 20px;
    cursor: pointer;
    font-size: 12px;
    .item {
      margin-bottom: 8px;
    }
  }
}
</style>
