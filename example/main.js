import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import installComps, { utils } from '@/index'
console.log(`utils`, utils)
// import installComps from '../dist/oeos-components-es.js'
// import '../dist/style.css'

// 加入element-plus
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'


import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const app = createApp(App)
import VueTippy from 'vue-tippy'

app.use(installComps).use(createPinia()).use(ElementPlus,, {
  locale: zhCn,
})
app.use(VueTippy)

app.mount('#app')
