import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router';
import BootstrapVue3 from 'bootstrap-vue-3';
import Toast from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
// import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(BootstrapVue3);
app.use(Toast);
// app.use(store);

app.mount('#app');
