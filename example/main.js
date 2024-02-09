import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import installComps from 'pkg/index'
// import installComps from '../dist/oeos-v3-components-es.js'
import '../dist/style.css'

// 加入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(installComps).use(createPinia()).use(ElementPlus)

app.mount('#app')
