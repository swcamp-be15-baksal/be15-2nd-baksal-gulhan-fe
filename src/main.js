import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router';
import BootstrapVue3 from 'bootstrap-vue-3';
// import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

import Toast, { TYPE } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { useAuthStore } from './stores/auth';

async function bootstrap() {
    const app = createApp(App);
    app.use(createPinia);
    const authStore = useAuthStore();
    // TODO 새로고침 할 때 refresh token으로 access token 응답 받게 만들기!
    try {
        // 1. 요청 응답 받기
        // 2. setAuth로 응답 값 처리 로직 진행하기

        console.log('초기화 : 로그인 상태 유지');
    } catch (e) {
        console.log('초기화 : 로그 아웃 상태 유지');
    }

    app.use(router);
    // app.use(store);
    app.use(createPinia());
    app.use(BootstrapVue3);

    // 기본 옵션 적는 방법
    // https://github.com/Maronato/vue-toastification?tab=readme-ov-file#presetting-default-toast-options-per-type
    const notificationOptions = {
        toastDefaults: {
            [TYPE.ERROR]: {
                timeout: 2000,
            },
        },
    };

    app.use(Toast, notificationOptions);

    app.mount('#app');
}
