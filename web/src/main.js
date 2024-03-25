import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

document.title='jsjds';
createApp(App).use(store).use(router).use(router).mount('#app')
