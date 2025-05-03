import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router';
import BootstrapVue3 from 'bootstrap-vue-3';
// import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

import Toast, {TYPE} from "vue-toastification"
import "vue-toastification/dist/index.css";

const app = createApp(App);

app.use(router);
// app.use(store);
app.use(createPinia());
app.use(BootstrapVue3);

// 기본 옵션 적는 방법
// https://github.com/Maronato/vue-toastification?tab=readme-ov-file#presetting-default-toast-options-per-type
const notificationOptions = {
    toastDefaults: {
        [TYPE.ERROR]:{
            timeout: 2000
        }
    }
}

app.use(Toast, notificationOptions)

app.mount('#app');
