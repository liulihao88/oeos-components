import { ElMessage } from 'element-plus'
import { clone, isEmpty, throttle, debounce, $toast } from '@/utils/src/index.ts'
import CusLoading from './cusLoading/cusLoading.js'
import CusEmpty from './cusEmpty/cusEmpty.js'
import Copy from './copy/index.ts'
/**
 * 复制文本
 * <span v-copy="'生当作人杰'">咋回事</span>
 * import { $toast } from '/@/utils/src/index.ts'
 */

export default function (app) {
  app.directive('cusLoading', CusLoading)
  app.directive('cusEmpty', CusEmpty)
  app.directive('copy', Copy)

  app.directive('focus', {
    mounted(el) {
      const input = el.nodeName === 'INPUT' ? el : el.querySelector('input')
      setTimeout(() => {
        input.focus()
      }, 0)
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

  // 注册自定义指令
  app.directive('number', {
    mounted(el) {
      const inputEl = el.nodeName === 'INPUT' ? el : el.querySelector('input')
      if (!inputEl) {
        console.error('v-number directive requires an input element')
        return
      }

      // 设置初始值
      inputEl.value = inputEl.value

      // 监听 input 事件
      inputEl.addEventListener('input', handleInput)
    },
    updated(el) {
      const inputEl = el.nodeName === 'INPUT' ? el : el.querySelector('input')
      if (!inputEl) {
        console.error('v-number directive requires an input element')
        return
      }

      // 获取 min 和 max 的值
      const elMin = inputEl.min ? Number(inputEl.min) : null
      const elMax = inputEl.max ? Number(inputEl.max) : null

      // 更新 min 和 max 的值
      inputEl._min = elMin
      inputEl._max = elMax

      // 确保当前值在 min 和 max 之间
      enforceMinMax(inputEl)
    },
  })

  // 处理输入的函数
  function handleInput(event) {
    const inputEl = event.target
    const cursorPosition = inputEl.selectionStart // 保存光标位置
    const originalLength = inputEl.value.length // 保存原始长度

    // 只允许输入数字
    inputEl.value = inputEl.value.replace(/[^0-9]/g, '')

    // 强制执行 min 和 max 限制
    enforceMinMax(inputEl)

    if (inputEl.value) {
      inputEl.value = Number(inputEl.value)
    }

    // 调整光标位置
    const newLength = inputEl.value.length
    const positionDifference = originalLength - newLength
    inputEl.setSelectionRange(cursorPosition - positionDifference, cursorPosition - positionDifference)
  }

  // 强制执行 min 和 max 限制的函数
  function enforceMinMax(inputEl) {
    const elMin = inputEl._min
    const elMax = inputEl._max
    if (elMin !== null && inputEl.value && Number(inputEl.value) < elMin) {
      inputEl.value = Number(elMin.toString())
    }
    if (elMax !== null && inputEl.value && Number(inputEl.value) > elMax) {
      inputEl.value = Number(elMax.toString())
    }
  }

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
