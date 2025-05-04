import { defineStore } from 'pinia';

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
            const payload = JSON.parse(at.split('.')[1]);
            console.log('payload', payload);
            userRank.value = payload.rank;
            expirationTime.value = payload.exp * 1000;
        } catch (e) {
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
