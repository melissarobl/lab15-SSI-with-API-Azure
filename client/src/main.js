import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import './style.css'

import App from './App.vue'

//createApp(App).mount('#app')

const app = createApp(App) //vue app
const pinia = createPinia() //store

app.use(pinia) //use the store

app.mount('#app') //make sure app is connected
