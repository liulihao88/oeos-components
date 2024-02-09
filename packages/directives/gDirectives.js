import { $toast } from 'pkg/utils/gFunc.js'
import { clone } from 'pkg/utils/gFunc.js'

/**
 * 复制文本
 * <span v-copy="'生当作人杰'">咋回事</span>
 * import { $toast } from '/@/utils/gFunc.js';
 */
export function copy(app) {
  function handleClick() {
    const input = document.createElement('input')
    input.value = this.copyData.toLocaleString()
    document.body.appendChild(input)
    input.select()
    document.execCommand('Copy')
    document.body.removeChild(input)
    $toast()({
      duration: 400,
      message: `${input.value} 复制成功`,
      type: 'success',
    })
  }
  app.directive('copy', {
    mounted(el, binding) {
      el.copyData = binding.value
      el.addEventListener('click', handleClick)
    },
  })
}

export function number(app) {
  app.directive('number', {
    mounted(el) {
      console.log('el', el)
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
}

/**
 * 自动聚焦
 * v-focus
 */
export function focus(app) {
  app.directive('focus', {
    mounted(el) {
      el = el.nodeName === 'INPUT' ? el : el.getElementsByTagName('input')[0]
      el.focus()
    },
  })
}
