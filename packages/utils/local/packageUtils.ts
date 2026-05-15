import { getVariable } from '../src/index.ts'
export function getPieColorByDataIndex(params: any, usedPercent: string) {
  if (params.dataIndex === 0) {
    if (parseInt(usedPercent) > 100) {
      return getVariable('--el-color-danger')
    }
    return getVariable('--el-color-primary')
  } else {
    return getVariable('--el-color-success')
  }
}
