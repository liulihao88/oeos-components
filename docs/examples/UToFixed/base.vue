<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
let base = proxy.toFixed(22)
let string = proxy.toFixed('22')
let digit4 = proxy.toFixed('22', 4)
let toNumber = proxy.toFixed('22.321321', 2, true)
</script>

<template>
  <div>
    <o-title title="toFixed(22)">
      {{ base }}
    </o-title>
    <o-title title="toFixed('22')">
      {{ string }}
    </o-title>
    <o-title title="toFixed('22', 4)">
      {{ digit4 }}
    </o-title>
    <o-title title="proxy.toFixed('22', 2, false)">
      {{ toNumber }}
    </o-title>
  </div>
</template>
