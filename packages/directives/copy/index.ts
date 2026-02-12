import { useEventListener } from '@vueuse/core'
import { copy as copyText, $toast } from '@/utils/src/index.ts'
import type { Directive, DirectiveBinding } from 'vue'

export interface CopyEl extends HTMLElement {
  copyValue: string
}

/** 文本复制指令（默认双击复制） */
const copy: Directive = {
  mounted(el: CopyEl, binding: DirectiveBinding<string>) {
    const { value } = binding
    if (value) {
      el.copyValue = value
      console.log(`36 binding`, binding)
      const arg = binding.arg ?? 'dblclick'
      // Register using addEventListener on mounted, and removeEventListener automatically on unmounted
      useEventListener(el, arg, () => {
        const success: boolean = copyText(el.copyValue, { hideToast: true })
        console.log(`03 success`, success)
        success
          ? $toast(`<span class="cl-blue">${el.copyValue}</span> 复制成功`, { dangerouslyUseHTMLString: true })
          : $toast.error(`<span class="cl-blue">${el.copyValue}</span> 复制失败`, { dangerouslyUseHTMLString: true })
      })
    } else {
      throw new Error('[Directive: copy]: need value! Like v-copy="modelValue"')
    }
  },
  updated(el: CopyEl, binding: DirectiveBinding) {
    el.copyValue = binding.value
  },
}

export default copy
