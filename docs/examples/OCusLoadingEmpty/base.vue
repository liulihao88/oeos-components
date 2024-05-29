<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const emptyText = ref('自定义empty文本')
const cusLoadingText = ref('自定义loading文本')
const list = ref([])
const isLoading = ref(false)
init()
async function init() {
  isLoading.value = true
  await proxy.sleep(3000)
  isLoading.value = false
}
</script>

<template>
  <div v-cus-loading:[cusLoadingText]="true" class="h-200">
    <div>docs/examples/OTest/base.vue</div>
  </div>
  <div v-cus-empty:[emptyText]="true" class="h-200">
    <div>docs/examples/OTest/base.vue</div>
  </div>
  <div v-cus-loading="isLoading" v-cus-empty="list.length === 0 && !isLoading" class="h-200"></div>
</template>

<style scoped lang="scss"></style>
