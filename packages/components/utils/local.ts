import { processWidth } from '@/utils/src/index.ts'
export const handleWidthHeight = (width, height) => {
  if (!width && !height) {
    return {}
  }
  let widthHeightobj: Record<string, string> = {}
  if (width) {
    widthHeightobj.width = processWidth(width, true)
  }
  if (height) {
    widthHeightobj.height = processWidth(height, true)
  }
  return widthHeightobj
}
