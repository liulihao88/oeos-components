import { createApp } from 'vue'
import Loading from './cusLoading.vue'
import { addClass, removeClass } from '@/utils/local/dom.ts'

const loadingDirective = {
  mounted(el, binding) {
    const app = createApp(Loading)
    const instance = app.mount(document.createElement('div'))
    el.instance = instance
    const loadingText = binding.arg
    // instance.setLoadingText(loadingText)
    if (loadingText !== undefined) {
      instance.loadingText = loadingText
    }
    if (binding.value) {
      append(el)
    }
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el)
    }
  },
}

function append(el) {
  const style = getComputedStyle(el)
  // 如果父组件, 没有定位, 给父组件添加相对定位
  if (!['relative', 'absolute', 'fixed'].includes(style.position)) {
    addClass(el, 'po-r')
  }
  el.appendChild(el.instance.$el)
}

function remove(el) {
  removeClass(el, 'po-r')
  el.removeChild(el.instance.$el)
}

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
