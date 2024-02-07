import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import installComps from '../packages/index'

const app = createApp(App)

app.use(installComps).use(createPinia())

app.mount('#app')
