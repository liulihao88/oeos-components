<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

const cc = ref()
</script>

<template>
  <div>
    <div>docs/examples/OTest/base.vue</div>
    <o-input v-model="cc" placeholder="你瞅啥">
      <template #prepend>prepend前置插槽</template>
      <template #prefix>prefix前缀插槽</template>
      <template #suffix>suffix后缀插槽</template>
      <template #append>append后置插槽</template>
    </o-input>
  </div>
</template>
