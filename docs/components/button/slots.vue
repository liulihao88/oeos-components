<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { $toast } from '@oeos-components/utils'
const handleClick = () => {
  $toast('handleClick')
}
</script>

<template>
  <div>
    <el-button :time="1000" @click="handleClick">
      <template #icon>
        <o-icon name="delete"></o-icon>
      </template>
      男人
    </el-button>
    <o-button :time="1000" @click="handleClick" type="primary">
      <template #icon>
        <o-icon name="delete"></o-icon>
      </template>
      男人(o-button)
    </o-button>

    <!-- loading插槽 -->
    <el-button @click="handleClick" loading>
      <template #loading>
        <o-icon name="refresh"></o-icon>
      </template>
      我是loading插槽
    </el-button>

    <o-button @click="handleClick" loading type="primary">
      <template #loading>
        <o-icon name="refresh"></o-icon>
      </template>
      我是loading插槽(o-button)
    </o-button>
  </div>
</template>
