import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import installComps, { utils } from '@/index'
console.log(`utils`, utils)
// import installComps from '../dist/oeos-components-es.js'
// import '../dist/style.css'

// 加入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const app = createApp(App)

app.use(installComps).use(createPinia()).use(ElementPlus)

app.mount('#app')
