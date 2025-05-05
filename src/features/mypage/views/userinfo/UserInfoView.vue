<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/features/mypage/stores/user';
import UserInfoForm from '@/features/mypage/components/form/userinfo/UserInfoForm.vue';
import { useAuthStore } from '@/stores/auth.js';
import MyPageHeader from '@/features/mypage/components/common/MyPageHeader.vue';


const router = useRouter();
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
const displayGender = computed(() => {
  return userInfo.value.gender === 'F' ? '여성'
    : userInfo.value.gender ==='M' ? '남성'
      : '해당없음';
});
const isVerified = ref(false);

const maskedInfo = computed(() => ({
  id: userInfo.value.userId?.slice(0, 2) + '****' || '',
  email: userInfo.value.email?.replace(/(.{2}).+(@.+)/, '$1****$2') || '',
  username: (() => {
    const name = userInfo.value.username || '';
    if (name.length === 2) return name[0] + '*';
    if (name.length === 3) return name[0] + '*' + name[2];
    if (name.length >= 4) return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
    return '*';
  })(),
  phone: userInfo.value.phone?.replace(/(\d{3})-(\d{4})-(\d{4})/, '$1-****-$3') || '',
  birth: userInfo.value.birth?.replace(/\d{2}$/, '**') || '',
  gender: userInfo.value.gender || '',
  address: userInfo.value.address?.replace(/^(.{9}).+/, '$1***') || ''
}));

function handleDelete() {
  const confirmed = confirm('정말 탈퇴 하시겠습니까?');
  if (confirmed) {
    console.log('탈퇴 처리');
  }
}

function handleEdit() {
  router.push(`/mypage/userinfo/edit`);
}
</script>

<template>
  <MyPageHeader />
  <div class="d-flex flex-column align-items-center">
    <UserInfoForm
      :user-info="userInfo"
      :masked-info="maskedInfo"
      :is-verified="isVerified"
      :displayGender="displayGender"
      @edit="handleEdit"
      @delete="handleDelete"
    />
  </div>
</template>
