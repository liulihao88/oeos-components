<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { $toast } from '@oeos-components/utils'
</script>

<template>
  <div>
    <o-button>我是按钮</o-button>

    <o-button size="small" type="primary" :loading="false" :time="1000" @click="$toast('一秒显示一次')">
      小按钮
    </o-button>
  </div>
</template>
