<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    {{ proxy.formatBytesConvert('1,234 GB', { thounsand: true }) }}
    {{ proxy.formatBytesConvert('1,234 GB') }}
    {{ proxy.formatBytesConvert({ age: 18 }) }}
  </div>
</template>
