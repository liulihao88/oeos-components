<script setup lang="ts">
import { ref, getCurrentInstance, watch } from 'vue'
const { proxy } = getCurrentInstance()
function result(res) {
  console.log(`res`, res)
}
const areaValue = ref(['12', '1201', '120101'])
areaValue.value = ['13', '1305', '130506']
</script>

<template>
  <div class="box">
    <o-choose-area @change="result" v-model="areaValue" width="300"></o-choose-area>
  </div>
</template>

<style scoped lang="scss"></style>
