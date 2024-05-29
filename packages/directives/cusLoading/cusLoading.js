import Loading from './cusLoading.vue'
import createLoadingLikeDirective from '../createLoadingLikeDirective.js'

let loadingDirective = createLoadingLikeDirective(Loading)

export default loadingDirective

/**
 *  @使用方式
<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const isLoading = ref(true)
const loadingText= '小样, 你脱了马甲我照样认识你'
</script>

<template>
  <div v-cus-loading:[loadingText]="isLoading" class="h-300 ">我说呢</div>
</template> 
*/
