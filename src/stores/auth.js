import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import router from '@/router';
import { useToast } from 'vue-toastification';

export const useAuthStore = defineStore('auth', () => {
    const accessToken = ref(null);
    const userRank = ref(null);
    const userId = ref(null);
    const expirationTime = ref(null);

    const isAuthenticated = computed(() => {
        return !!accessToken.value && Date.now() < (expirationTime.value || 0);
    });

    function setAuth(at) {
        accessToken.value = at;
        try {
            const payload = JSON.parse(atob(at.split('.')[1]));
            userRank.value = payload.rank;
            userId.value = payload.sub;
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

    function logout() {
        clearAuth();
        router.push({ name: 'login' });
    }

    return {
        accessToken,
        userId,
        userRank,
        expirationTime,
        isAuthenticated,
        setAuth,
        clearAuth,
        logout,
    };
});

router.beforeEach((to) => {
    const authStore = useAuthStore();
    const toast = useToast();
    const authRequirePages = [
        'MypageMain',
        'cart',
        'beforePayment',
        'paymentResult',
        'payment',
        'success',
        'packages-write',
        'goods-write',
        'DashboardMain',
        'DashboardOrder',
        'DashboardShippingView',
        'board-edit',
        'board-write',
        'NoticeWrite',
        'NoticeEdit',
    ];

    if ((to.name === 'login' || to.name === 'signup') && authStore.isAuthenticated) {
        toast.error('이미 로그인 된 상태입니다.');
        return { name: 'main' };
    }

    if (authRequirePages.includes(to.name) && !authStore.isAuthenticated) {
        toast.error('로그인이 필요합니다.');
        return { name: 'login' };
    }
});
