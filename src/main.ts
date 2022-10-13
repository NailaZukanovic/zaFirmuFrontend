import { createApp } from 'vue';
import App from './App.vue';

import axios from 'axios';
import VueAxios from 'vue-axios';

import './registerServiceWorker'


createApp(App)
   .use(VueAxios, axios.create({
      baseURL: 'http://localhost:3000/api'
   }))
   .mount('#app')
