import { createApp, nextTick } from 'vue'
import { addClass, removeClass } from '@/utils/local/dom.ts'
const relativeCls = 'po-r'

export default function createLoadingLikeDirective(comp) {
  const loadingDirective = {
    mounted(el, binding) {
      const app = createApp(comp)
      const instance = app.mount(document.createElement('div'))
      const name = comp.__name
      if (!el[name]) {
        el[name] = {}
      }
      el[name].instance = instance
      const loadingText = binding.arg
      // instance.setLoadingText(loadingText)
      if (loadingText !== undefined) {
        el[name].instance.loadingText = loadingText
      }
      if (binding.value) {
        append(el)
      }
    },
    updated(el, binding) {
      const loadingText = binding.arg
      const name = comp.__name
      if (typeof title !== 'undefined') {
        el[name].instance.loadingText = loadingText
      }
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    },
  }
  return loadingDirective

  /**
   * 由于同时加v-cus-loading和v-cus-empty的时候, 可能v-cus-empty先执行, 那么就会把po-r这个class移除掉. 造成empty组件不显示. 所以在append的时候, 加个异步. 等所有移除操作执行完毕以后, 再加po-r.
   */
  async function append(el) {
    await nextTick()
    const style = getComputedStyle(el)
    const name = comp.__name
    // 如果父组件, 没有定位, 给父组件添加相对定位
    if (!['relative', 'absolute', 'fixed'].includes(style.position)) {
      addClass(el, relativeCls)
      if (name === 'cusLoading') {
        addClass(el, 'c-model')
      }
    }
    el.appendChild(el[name].instance.$el)
  }

  function remove(el) {
    const name = comp.__name
    removeClass(el, relativeCls)
    removeClass(el, 'c-model')
    el.removeChild(el[name].instance.$el)
  }
}
