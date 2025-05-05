<script setup>
import { computed, nextTick, ref, watch, watchEffect } from 'vue';
import { useUserStore } from '@/features/mypage/stores/user.js';
import { useAuthStore } from '@/stores/auth.js';
import { updateUserInfo } from '@/features/mypage/api.js';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import PasswordEditForm from '@/features/mypage/components/PasswordEditForm.vue';
import UserInfoEditForm from '@/features/mypage/components/UserInfoEditForm.vue';

const authStore = useAuthStore();
const userStore = useUserStore();
const toast = useToast();
const router = useRouter();

const isFocused = ref({
  phone: false,
  address: false,
});

const password = ref('');
const passwordConfirm = ref('');

const userInfo = computed(() => userStore.userInfo || {});
const displayGender = computed(() => {
  return userInfo.value.gender === 'F' ? '여성'
        : userInfo.value.gender ==='M' ? '남성'
        : '해당없음';
});

watch(() => authStore.accessToken, token => {
  if (token) userStore.loadUserInfo();
}, { immediate: true });

watchEffect(() => {
  const fullAddress = userInfo.value.address;
  if (fullAddress && !userInfo.value.detailAddress) {
    const match = fullAddress.match(/(.+?\d{1,3}(길|로|가)?(?:\s*\d+)?)(.*)/);

    if (match) {
      userInfo.value.address = match[1].trim();         // 기본 주소
      userInfo.value.detailAddress = match[3]?.trim();  // 상세 주소
    } else {

      const parts = fullAddress.split(' ');
      userInfo.value.address = parts.slice(0, -1).join(' ');
      userInfo.value.detailAddress = parts.slice(-1)[0];
    }
  }
});


function isValidPassword(password) {
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return regex.test(password);
}

function createInfoUpdateData() {
  const data = {};
  if (userInfo.value.phone) data.phone = userInfo.value.phone;

  const fullAddress = `${userInfo.value.address || ''} ${userInfo.value.detailAddress || ''}`.trim();
  if (fullAddress) data.address = fullAddress;

  return Object.keys(data).length ? data : null;
}

function createPasswordUpdateData() {
  if (!password.value.trim() || !passwordConfirm.value.trim()) {
    toast.error('비밀번호를 입력해 주세요.');
    return null;
  }

  if (password.value !== passwordConfirm.value) {
    toast.error('비밀번호가 일치하지 않습니다.');
    return null;
  }

  if (!isValidPassword(password.value)) {
    toast.error('비밀번호는 8자 이상이며, 대/소문자, 숫자, 특수문자를 포함해야 합니다.');
    return null;
  }

  const data = {
    password: password.value,
    phone: userInfo.value.phone,
    address: `${userInfo.value.address || ''} ${userInfo.value.detailAddress || ''}`.trim()
  };

  return data;
}

function handleInfoUpdate() {
  const accessToken = authStore.accessToken;
  if (!accessToken) return toast.error('로그인이 필요합니다.');
  const data = createInfoUpdateData();
  if (!data) return toast.info('변경된 정보가 없습니다.');

  updateUserInfo(data, accessToken)
    .then(() => {
      toast.success('회원 정보 수정이 완료되었습니다!');
      router.push('/mypage/userinfo');
    })
    .catch(() => toast.error('회원 정보 수정에 실패했습니다.'));
}

function handlePasswordUpdate() {
  const accessToken = authStore.accessToken;
  if (!accessToken) return toast.error('로그인이 필요합니다.');

  const data = createPasswordUpdateData();
  if (!data) return;

  updateUserInfo(data, accessToken)
    .then(() => {
      toast.success('비밀번호 변경이 완료되었습니다!');
      router.push('/mypage/userinfo');
    })
    .catch(() => toast.error('비밀번호 변경에 실패했습니다.'));
}

function searchPostcode() {
  new window.daum.Postcode({
    oncomplete: function (data) {
      userInfo.value.postcode = data.zonecode;
      userInfo.value.address = data.roadAddress !== '' ? data.roadAddress : data.jibunAddress;
      nextTick(() => {
        document.getElementById('detail-address')?.focus();
      });
    }
  }).open();
}
</script>

<template>
  <div class="d-flex flex-column align-items-center py-5">
    <UserInfoEditForm
      v-if="userInfo && userInfo.userId"
      :userInfo="userInfo"
      :displayGender="displayGender"
      :isFocused="isFocused"
      @submit="handleInfoUpdate"
      @searchPostcode="searchPostcode"
    />
    <PasswordEditForm
      v-model:password="password"
      v-model:passwordConfirm="passwordConfirm"
      @submit="handlePasswordUpdate"
    />
  </div>
</template>

