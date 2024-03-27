<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const checkboxValue = ref(['xxx'])
const options = ref([
  { name: '小月月11111111', id: 'xyy' },
  { name: '小鑫鑫22222222', id: 'xxx' },
  { name: '小瑞瑞', id: 'xrr' },
  { name: '胡汉三', id: 'hhs' },
  { name: '大力哥', id: 'dlg' },
])
function change(checkValue) {
  console.log(`checkValue`, checkValue)
}
</script>

<template>
  <div>
    <o-checkbox
      @change="change"
      v-model="checkboxValue"
      :options="options"
      label="name"
      :showAll="false"
      size="small"
      type="button"
      value="id"
      :checkboxDisabled="(item) => item.id === 'xrr'"
    ></o-checkbox>
  </div>
</template>

<style scoped lang="scss"></style>
