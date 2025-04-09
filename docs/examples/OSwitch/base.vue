<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const cc = ref(false)
const dd = ref(false)
const loading = ref(false)

async function random() {
  let random = Math.random()
  console.log(`37 random`, random)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (random < 0.5) {
        return resolve()
      } else {
        return reject()
      }
    }, 2000)
  })
}

const beforeChange = async () => {
  loading.value = true
  try {
    await random()
    return true
  } catch (e) {
    console.log(`43 e`, e)
    return false
  } finally {
    loading.value = false
  }
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

    <o-switch v-model="dd" :before-change="beforeChange" :loading="loading" active-text="异步"></o-switch>
  </div>
</template>
