import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import router from '@/router';

export const useAuthStore = defineStore('auth', () => {
    const accessToken = ref(null);
    const userRank = ref(null);
    const expirationTime = ref(null);

    const isAuthenticated = computed(() => {
        return !!accessToken.value && Date.now() < (expirationTime.value || 0);
    });

    function setAuth(at) {
        accessToken.value = at;
        try {
            const payload = JSON.parse(atob(at.split('.')[1]));
            userRank.value = payload.rank;
            expirationTime.value = payload.exp * 1000;
        } catch (e) {
            console.log('에러 발생!!!' + e);
            accessToken.value = null;
            userRank.value = null;
            expirationTime.value = null;
        }
    }

    function clearAuth() {
        accessToken.value = null;
        userRank.value = null;
        expirationTime.value = null;
    }

    return {
        accessToken,
        userRank,
        expirationTime,
        isAuthenticated,
        setAuth,
        clearAuth,
    };
});

router.beforeEach((to) => {
    const authStore = useAuthStore();

    if ((to.name === 'login' || to.name === 'signup') && authStore.isAuthenticated) {
        console.log('리다이렉트 동작!!');
        return { name: 'main' };
    }
});
