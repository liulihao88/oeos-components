<template>
  <div>
    <el-input type="primary" v-model="aa" v-throttle.input="input"></el-input>
    <o-input type="primary" v-model="aa" v-throttle.input="input"></o-input>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

function handleEvent(evt, ...rest) {
  console.log(`72 evt`, evt)
  console.log(`39 rest`, rest)
}
const aa = ref(2131)
function input(el) {
  proxy.log(`aa`, aa, '19行 docs/examples/ODirectives/input.vue')
}
</script>
