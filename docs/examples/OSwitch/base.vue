<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const cc = ref(false)
const dd = ref(false)
const randomValue = ref()

async function random() {
  let random = Math.random()
  randomValue.value = random
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (random >= 0.5) {
        return resolve(random)
      } else {
        return reject('我错了')
      }
    }, 500)
  })
}

const beforeChange = async () => {
  await random()
}
</script>

<template>
  <div>
    <o-switch v-model="cc"></o-switch>
    <br />

    <o-switch v-model="cc" active-text="这是active的text" :inline-prompt="false"></o-switch>
    <br />
    <o-switch v-model="cc" active-text="是" inactive-text="否"></o-switch>
    <br />

    <o-switch v-model="cc" active-text="测试更长的启用" inactive-text="停用" :active-value="1" :inactive-value="0" />

    <o-title title="异步方法, 自带loading; 大于等于0.5可切换, 否则不可切换"></o-title>
    <o-switch v-model="dd" :before-change="beforeChange" inactive-text="异步" active-text="异步"></o-switch>
    {{ randomValue }}
  </div>
</template>
