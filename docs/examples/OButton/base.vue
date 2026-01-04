<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { $toast } from '@oeos-components/utils'
</script>

<template>
  <div>
    <o-button icon="plus" type="primary">我是按钮</o-button>
    <o-button content="我是提示文字" icon="plus" type="primary">有提示且有icon</o-button>
  </div>
</template>
