<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
function close() {
  proxy.$toast('关闭')
}
const iptValue = ref('')
</script>

<template>
  <div>
    <o-item-wrapper :columns="1">
      <o-input content="这里主要是为了让其鼠标移入显示文本" v-model="iptValue">
        <template #prepend>prepend前置插槽</template>
        <template #prefix>prefix前缀插槽</template>
        <template #suffix>suffix后缀插槽</template>
        <template #append>append后置插槽</template>
      </o-input>
      <o-input title="名字" v-model="iptValue" width="500" placeholder="请输入名字" size="default"></o-input>
      <o-input title="密码框" type="password" v-model="iptValue"></o-input>
      <o-input type="textarea" v-model="iptValue"></o-input>
    </o-item-wrapper>
  </div>
</template>

<style scoped lang="scss"></style>
