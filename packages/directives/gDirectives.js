import { $toast } from '../utils'
import { ElMessage } from 'element-plus'
import { clone, isEmpty, throttle, debounce } from '../utils'
import CusLoading from './cusLoading/cusLoading.js'
import CusEmpty from './cusEmpty/cusEmpty.js'
/**
 * 复制文本
 * <span v-copy="'生当作人杰'">咋回事</span>
 * import { $toast } from '/@/utils'
 */

export default function (app) {
  app.directive('cusLoading', CusLoading)
  app.directive('cusEmpty', CusEmpty)
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

  app.directive('directives', {
    mounted(el, binding) {
      const directives = binding.value
      const instance = binding.instance
      const contextDirectives = instance.$.appContext.directives
      if (!directives) {
        return {}
      }
      Object.keys(directives).forEach((directive) => {
        if (directives[directive]) {
          const directiveFn = contextDirectives[directive]
          if (directiveFn && directiveFn.mounted) {
            directiveFn.mounted(el, { value: directives[directive], instance })
          } else if (directiveFn && directiveFn.inserted) {
            directiveFn.inserted(el, { value: directives[directive], instance })
          }
        }
      })
    },
  })

  app.directive('number', {
    mounted(el) {
      const inputEl = el.nodeName === 'INPUT' ? el : el.querySelector('input')

      if (!inputEl) {
        console.error('v-number directive requires an input element')
        return
      }

      if (inputEl.placeholder === '请输入') {
        inputEl.placeholder = '请输入数字'
      }

      inputEl.addEventListener('input', () => {
        const cursorPosition = inputEl.selectionStart // 保存光标位置
        const originalLength = inputEl.value.length // 保存原始长度

        inputEl.value = inputEl.value.replace(/[^0-9]/g, '')

        // 调整光标位置
        const newLength = inputEl.value.length
        const positionDifference = originalLength - newLength
        inputEl.setSelectionRange(cursorPosition - positionDifference, cursorPosition - positionDifference)

        // 使用 setTimeout 确保事件顺序
        setTimeout(() => {
          inputEl.dispatchEvent(new Event('input'))
        })
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
        if (el.nodeName === 'INPUT' || el.getElementsByTagName('input').length > 0) {
          el.method = {
            input: true,
          }
        } else {
          el.method = {
            click: true,
          }
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
      // 如果没有传递任何方法, 那么给添加默认的click事件, 如果是input输入框, 那么默认加input事件
      if (isEmpty(el.method)) {
        if (el.nodeName === 'INPUT' || el.getElementsByTagName('input').length > 0) {
          el.method = {
            input: true,
          }
        } else {
          el.method = {
            click: true,
          }
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
