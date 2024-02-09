import { $toast } from '../utils/gFunc.js'
import { ElMessage } from 'element-plus'
import { clone } from '../utils/gFunc.js'

/**
 * 复制文本
 * <span v-copy="'生当作人杰'">咋回事</span>
 * import { $toast } from '/@/utils/gFunc.js';
 */
export default function (app) {
  console.log('app', app)
  function handleClick() {
    const input = document.createElement('input')
    input.value = this.copyData.toLocaleString()
    document.body.appendChild(input)
    input.select()
    document.execCommand('Copy')
    document.body.removeChild(input)
    $toast()({
      duration: 1000,
      message: `${input.value} 复制成功`,
      type: 'success',
    })
  }
  app.directive('copy', {
    mounted(el, binding) {
      console.log('binding', binding)
      console.log('el', el)
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
