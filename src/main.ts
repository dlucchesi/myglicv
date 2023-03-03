import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './plugins/router'
import './style.css'
import App from './App.vue'
import './style.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faBars } from "@fortawesome/free-solid-svg-icons"
library.add(faBars)
/* add icons to the library */
// library.add(faBars)

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')


app.config.globalProperties.$dateFormat = "YYYY.MM.DD HH:mm"