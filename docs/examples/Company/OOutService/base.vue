<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const details = {
  name: 'S3网关服务',
  status: 'S3READDELETE111',
  port: '9003',
  serveCount: 3,
}
</script>

<template>
  <div>
    <div>docs/examples/Company/OOutService/base.vue</div>
    <OOutService :details="details" class="h-300 w-300"></OOutService>
    <br />
    <OOutService :details="details" type="horizontal" class="w-100%"></OOutService>
  </div>
</template>
