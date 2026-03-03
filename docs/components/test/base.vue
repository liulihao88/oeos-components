<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const isShow = ref(true)
const selectValue = ref(1)
</script>

<template>
  <div>
    <el-dialog ref="dialogRef" title="base" v-model="isShow">
      <o-select v-model="selectValue" :options="[1, 2]" type="simple" />
    </el-dialog>
  </div>
</template>
