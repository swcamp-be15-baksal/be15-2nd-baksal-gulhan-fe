import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { refreshUserToken } from '@/features/user/api/user.js';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

const api2 = axios.create({
    baseURL: import.meta.env.VITE_AUTH_SERVER_LOCAL_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true, // HttpOnly Cookie 사용 시 d설정하기!
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api2.interceptors.response.use(
    (res) => res,
    async (err) => {
        const authStore = useAuthStore();
        const { config, response } = err;

        if (config.url.includes('/auth/token/reissue')) {
            // 리프레시 요청에서 401이 오면 바로 로그아웃 처리
            await authStore.clearAuth();
            return Promise.reject(err);
        }

        // 401 에러만 처리
        if (response?.status === 401) {
            // 이미 재시도 한 요청이면 로그아웃 하고 에러 던짐
            if (config._retry) {
                await authStore.clearAuth();
                return Promise.reject(err);
            }
            config._retry = true;

            // 토큰 재발급 시도
            try {
                console.log('토큰 재발급 시도');
                const refreshRes = await refreshUserToken();
                const newToken = refreshRes.data.data.accessToken;
                authStore.setAuth(newToken);

                // 헤더 갱신 후 원래 요청 재시도
                config.headers.Authorization = `Bearer ${newToken}`;
                return api(config);
            } catch (refreshErr) {
                // 재발급 실패하면 로그아웃
                await authStore.clearAuth();
                return Promise.reject(refreshErr);
            }
        }

        // 그 외 에러는 그대로 던짐
        return Promise.reject(err);
    }
);

export { api, api2 };
