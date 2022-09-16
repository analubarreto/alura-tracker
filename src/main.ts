import { createApp } from 'vue';
import router from '@/router';
// @ts-ignore
import App from './App.vue';

import './assets/main.css'
import { store, key } from './store';

createApp(App)
  .use(router)
  .use(store, key)
  .mount('#app')