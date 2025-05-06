import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchUserInfo } from '@/features/mypage/api';
import { useAuthStore } from '@/stores/auth';

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(null);

  const loadUserInfo = async () => {
    console.log('loadUserInfo 실행');
    const authStore = useAuthStore();
    const accessToken = authStore.accessToken;
    console.log('accessToken 확인:', accessToken);

    if (!accessToken) return;

    try {
      const resp = await fetchUserInfo(accessToken);
      userInfo.value = resp.data.data;
    } catch (e) {
      console.error('회원 정보 조회 실패:', e.response?.data?.message || e.message);
    }
  };

  return {
    userInfo,
    loadUserInfo,
  };
});
