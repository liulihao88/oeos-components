import { $toast } from '../utils'
import { ElMessage } from 'element-plus'
import { clone, isEmpty, throttle, debounce } from '../utils'
/**
 * 复制文本
 * <span v-copy="'生当作人杰'">咋回事</span>
 * import { $toast } from '/@/utils'
 */
export default function (app) {
  function handleClick() {
    const input = document.createElement('input')
    input.value = this.copyData.toLocaleString()
    document.body.appendChild(input)
    input.select()
    document.execCommand('Copy')
    document.body.removeChild(input)
    $toast(`${input.value} 复制成功`, 's', { duration: 1000 })
  }
  app.directive('copy', {
    mounted(el, binding) {
      el.copyData = binding.value
      el.addEventListener('click', handleClick)
    },
  })

  app.directive('focus', {
    mounted(el) {
      el = el.nodeName === 'INPUT' ? el : el.getElementsByTagName('input')[0]
      el.focus()
    },
  })

  app.directive('number', {
    mounted(el) {
      el = el.nodeName === 'INPUT' ? el : el.getElementsByTagName('input')[0]
      if (el.placeholder === '请输入') {
        el.placeholder = '请输入数字'
      }
      el.addEventListener('keyup', function () {
        el.value = el.value.replace(/[^0-9]/g, '')
        el.dispatchEvent(new Event('input'))
      })
    },
  })

  /**
   * v-throttle="throttleMethod"
   * v-throttle.500="throttleMethod"
   * v-throttle.scroll.500="throttleMethod"
   * v-throttle="($event)=>throttleMethod($event, '其他参数')"
   */
  app.directive('throttle', {
    mounted(el, binding) {
      if (typeof binding.value !== 'function') {
        console.error('Directive value must be a function')
        return
      }
      let delay = 1000
      for (let key in binding.modifiers) {
        if (!isNaN(Number(key)) && typeof Number(key) === 'number') {
          delay = Number(key)
        } else {
          if (el.method === undefined) {
            el.method = {}
          }
          el.method[key] = true
        }
      }
      // 如果没有传递任何方法, 那么给添加默认的click事件
      if (isEmpty(el.method)) {
        el.method = {
          click: true,
        }
      }
      const throttledFn = throttle(binding.value, delay)
      el._ThrottleDirective = throttledFn
      for (const key in el.method) {
        el.addEventListener(key, throttledFn)
      }
    },
    unmounted(el, binding) {
      if (!el._ThrottleDirective) {
        return
      }
      for (const key in el.method) {
        el.removeEventListener(key, el._ThrottleDirective)
      }
      delete el._ThrottleDirective
    },
  })

  /**
   * v-debounce="throttleMethod"
   * v-debounce.500="throttleMethod"
   * v-debounce.scroll.500="throttleMethod"
   * v-debounce="($event)=>throttleMethod($event, '其他参数')"
   */
  app.directive('debounce', {
    mounted(el, binding) {
      if (typeof binding.value !== 'function') {
        console.error('Directive value must be a function')
        return
      }
      let delay = 1000
      for (let key in binding.modifiers) {
        if (!isNaN(Number(key)) && typeof Number(key) === 'number') {
          delay = Number(key)
        } else {
          if (el.method === undefined) {
            el.method = {}
          }
          el.method[key] = true
        }
      }
      // 如果没有传递任何方法, 那么给添加默认的click事件
      if (isEmpty(el.method)) {
        el.method = {
          click: true,
        }
      }
      const debouncedFn = debounce(binding.value, delay)
      el._DebounceDirective = debouncedFn
      for (const key in el.method) {
        el.addEventListener(key, debouncedFn)
      }
    },
    unmounted(el, binding) {
      if (!el._DebounceDirective) {
        return
      }
      for (const key in el.method) {
        el.removeEventListener(key, el._DebounceDirective)
      }
      delete el._DebounceDirective
    },
  })
}
