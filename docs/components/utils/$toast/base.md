# $toast 提示

## Hidden Title {.md-hidden}

### 基础用法

:::demo
U$toast/base
:::

```javascript
/**
 * @example1
  proxy.$toast('保存成功') // s:success; i: info; w: warning; e: error;  
  proxy.$toast('保存失败', 'e')
  proxy.$toast('永不关闭', {duration: 0})
  proxy.$toast({
    message: 'andy',
    type: 'warning',
    duration: 300,
    closeAll: true,
  })
* $toast.success('This is a success message')
* @example2 显示对象 
* $toast({
    dangerouslyUseHTMLString: true,
    message: `<h6>复制成功</h6><pre>${JSON.stringify(obj, null, 2)}</pre>`,
    type: 'success',
    duration: 5000,
  })
*/
type MessageType = 'success' | 'info' | 'error' | 'warning'
type ShortType = 's' | 'i' | 'e' | 'w'
type ToastType = MessageType | ShortType
type ToastOptions = Partial<MessageOptions> & { closeAll?: boolean }

export function $toast(
  message: string | ToastOptions,
  type: ToastType | ToastOptions = 'success',
  otherParams: ToastOptions = {},
): void {
  const typeMap: Record<ShortType, MessageType> = {
    s: 'success',
    i: 'info',
    e: 'error',
    w: 'warning',
  }

  function isShortType(t: any): t is ShortType {
    return ['s', 'i', 'e', 'w'].includes(t)
  }

  function isToastOptions(obj: any): obj is ToastOptions {
    return typeof obj === 'object' && obj !== null
  }

  // Case 1: message is options object
  if (isToastOptions(message)) {
    if (message.closeAll) {
      ElMessage.closeAll()
    }
    ElMessage(message)
    return
  }

  // Case 2: type is options object
  if (isToastOptions(type)) {
    if (type.closeAll) {
      ElMessage.closeAll()
    }
    ElMessage({
      message,
      type: 'success',
      ...type,
    })
    return
  }

  // Case 3: regular message with type and options
  if (otherParams.closeAll) {
    ElMessage.closeAll()
  }

  const resolvedType = isShortType(type) ? typeMap[type] : type

  ElMessage({
    message,
    type: resolvedType,
    ...otherParams,
  })
}

// Add shorthand methods for each type of message
$toast.success = (message, otherParams = {}) => $toast(message, 'success', otherParams)
$toast.info = (message, otherParams = {}) => $toast(message, 'info', otherParams)
$toast.error = (message, otherParams = {}) => $toast(message, 'error', otherParams)
$toast.warning = (message, otherParams = {}) => $toast(message, 'warning', otherParams)
```
