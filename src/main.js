import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router';
import BootstrapVue3 from 'bootstrap-vue-3';
// import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Toast, { TYPE } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import { useAuthStore } from './stores/auth';
import { refreshUserToken } from './features/user/api/user';

async function bootstrap() {
    const app = createApp(App);
    app.use(createPinia());
    const authStore = useAuthStore();
    // TODO 새로고침 할 때 refresh token으로 access token 응답 받게 만들기!
    if (!authStore.isAuthenticated) {
        try {
            const response = await refreshUserToken();
            authStore.setAuth(response.data.data.accessToken);
            console.log('초기화 : access token 재발급 완료');
        } catch (e) {
            authStore.clearAuth();
            console.log('초기화 : 로그인 만료');
        }
    } else {
        console.log('초기화 : 기존 access token 유효, refresh 생략');
    }

    app.use(router);
    // app.use(store);
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

await bootstrap();
