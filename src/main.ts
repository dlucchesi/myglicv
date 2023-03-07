import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './plugins/router'
import './style.css'
import App from './App.vue'
import './style.css'


const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)

app.mount('#app')


app.config.globalProperties.$userType = "userImp"
app.config.globalProperties.$measureType = "measureImp"