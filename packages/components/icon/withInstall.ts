import { App, Plugin } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { toLine } from '../../utils'

type SFCWithInstall<T> = T & Plugin

export const withInstall = <T, E extends Record<string, any>>(main: T, extra?: E) => {
  ;(main as SFCWithInstall<T>).install = (app: App) => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp)
    }
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(`el-icon-${toLine(key)}`, component)
    }
  }
  if (extra) {
    for (const [compName, comp] of Object.entries(extra)) {
      ;(main as Record<string, any>)[compName] = comp
    }
  }

  // 将 T 断言为具体的类型 T & plugin & Record<string, any>
  return main as SFCWithInstall<T> & E
}
