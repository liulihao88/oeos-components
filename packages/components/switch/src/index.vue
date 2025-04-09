<script setup lang="ts" name="OSwitch">
/** @使用方式
 <o-switch
    v-model="form.enableMetaDataInject"
    disabled
    active-text="开启管理控制1"
  ></o-switch>
*/
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

</script>

<template>
  <el-switch v-bind="$attrs" inline-prompt class="o-custom-switch" />
</template>

<style lang="scss" scoped>
.o-custom-switch {
  flex-direction: row-reverse; /* 反转子元素的顺序 */
  align-items: center;
  margin-right: 8px;
  :deep(.el-switch__label--right) {
    order: 1; /* 将active-text放在左边 */
    margin-right: 8px;
    margin-left: 0;
    font-weight: 900;
  }
  :deep(.el-switch__label--left) {
    margin-left: 8px;
    margin-right: 0;
    font-weight: 900;
  }
}
</style>
