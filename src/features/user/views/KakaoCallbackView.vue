<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';
import { onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

onMounted(() => {
  const userId = route.query.userId;
  const username = route.query.username;
  const accessToken = route.query.accessToken;
  const refreshToken = route.query.refreshToken;
  const needsAdditionalInfo = route.query.needsAdditionalInfo === 'true';

  if (!accessToken || !refreshToken) {
    toast.error('카카오 로그인 실패: 토큰 없음');
    return;
  }

  authStore.setAuth(accessToken);

  sessionStorage.setItem('kakao_userId', userId);
  sessionStorage.setItem('kakao_username', username);

  if (needsAdditionalInfo) {
    router.push('/kakao/additional-info');
  } else {
    router.push('/');
  }
});

</script>

<template>
  <div class="text-center mt-5">
    <p>카카오 로그인 중입니다. 잠시만 기다려주세요.</p>
  </div>
</template>
