import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'

/**
 * 对ElMessage进行封装, 不用每次都引入ElMessage, 而是挂载在全局
 * @example
 * proxy.$toast()('成功');
 * proxy.$toast().error('失败');
 */
export function $toast() {
  function message() {
    ElMessage.closeAll()
    return ElMessage
  }
  return message()
}

export function clone(data) {
  return cloneDeep(data)
}

export function sleep(delay = 0, fn) {
  return new Promise((resolve) =>
    setTimeout(() => {
      fn && fn()
      resolve()
    }, delay),
  )
}
