<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
function tt() {
  console.log('  </o-tooltip>')
}
function isTest13() {
  console.log('isTest13')
}

const iconLists = ref([
  'edit',
  'check',
  'delete',
  'warning',
  'refresh',
  'close',
  'add-location',
  'arrow-up',
  'arrow-right',
  'arrow-down',
  'arrow-left',
  'plus',
  'circle-close',
  'more',
  'zoom-in',
  'zoom-out',
  'lock',
  'unlock',
])
</script>

<template>
  <div>
    <o-icon name="delete"></o-icon>
    <o-icon name="warning" content="警告"></o-icon>
    <o-icon name="refresh" content="刷新" @click="tt" color="var(--yellow)" size="50" placement="right"></o-icon>
    <o-icon name="close" class="is-loading"></o-icon>
    <o-icon name="refresh" content="刷新" class="cl-blue"></o-icon>

    <hr>

    <div>
      <template v-for="(v, i) in iconLists" :key="i">
        <o-icon :name="v" :content="v"></o-icon>
      </template>
    </div>

    <hr>
    <o-title title="支持首字母大写, 驼峰, 中划线命名"></o-title>
    <o-icon name="AddLocation"></o-icon>
    <o-icon name="addLocation"></o-icon>
    <o-icon name="add-location"></o-icon>
    <br />
  </div>
</template>

<style scoped lang="scss"></style>
