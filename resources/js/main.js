import {createApp} from 'vue'
import App from './App.vue'
import router from './routes/router'
import vuetify from "./plugins/vuetify.js";
import {createPinia} from 'pinia';

createApp(App)
    .use(createPinia())
    .use(vuetify)
    .use(router)
    .mount('#app')
