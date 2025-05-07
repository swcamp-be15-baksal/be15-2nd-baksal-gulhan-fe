<script setup>
import UserSummaryItem from '../../components/common/UserSummaryItem.vue';
import { computed, watch } from 'vue';
import { useUserStore } from '@/features/mypage/stores/user.js';
import { useAuthStore } from '@/stores/auth.js';

const userStore = useUserStore();
const authStore = useAuthStore();

watch(
  () => authStore.accessToken,
  token => {
    if (token) {
      userStore.loadUserInfo();
    }
  },
  { immediate: true }
);

const userInfo = computed(() => userStore.userInfo || {});

const maskedUsername = computed(() => {
  const name = userInfo.value.username || '';
  if (name.length === 2) return name[0] + '*';
  if (name.length === 3) return name[0] + '*' + name[2];
  if (name.length >= 4) return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
  return '*';
});

const rankDisplayMap = {
  SLAVE: '노비',
  COMMONER: '평민',
  CHUNGIN: '중인',
  NOBLE: '양반',
  KING: '왕'
};

const menuList = [
  { label: '구매 내역', to: `/mypage/orderhistory` },
  { label: '배송지 관리', to: `/mypage/deliveryaddress` },
  { label: 'MY 관심', to: `/mypage/like` },
  { label: '리뷰 관리', to: `/mypage/review` },
  { label: '작성글 관리', to: `/mypage/post` }
];

</script>

<template>
  <div class="container py-5 min-vh-100">
    <div class="text-center mb-5">
      <h1 class="h3 fw-bold">마이페이지</h1>
    </div>

    <div class="mb-4">
      <UserSummaryItem
        :user-info="userInfo"
        :maskedUsername="maskedUsername"
        :rankDisplayMap="rankDisplayMap"
      />
    </div>

    <div class="border rounded bg-white shadow-sm overflow-hidden">
      <router-link
        v-for="(menu, index) in menuList"
        :key="menu.to"
        :to="menu.to"
        class="d-flex justify-content-between align-items-center px-4 py-4 text-decoration-none text-dark border-bottom"
        :class="{ 'border-0': index === menuList.length - 1 }"
      >
        <span class="fw-bold fs-5">{{ menu.label }}</span>
        <img src="@/assets/icons/chevron-right.svg" alt="chevron-right" width="24" height="24" class="ms-2" />
      </router-link>
    </div>
  </div>
</template>
