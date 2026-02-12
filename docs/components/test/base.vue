<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

let src = 'https://pure-admin.github.io/pure-admin-table/imgs/2.jpg'
</script>

<template>
  <div>
    <img :src="src" class="w-16 h-16" />
  </div>
</template>