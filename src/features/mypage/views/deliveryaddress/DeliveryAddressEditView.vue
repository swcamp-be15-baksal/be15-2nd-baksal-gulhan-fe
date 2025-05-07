<script setup>

import DeliveryAddressForm from '@/features/mypage/components/form/delivery/DeliveryAddressForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/features/mypage/stores/user.js';
import { useAuthStore } from '@/stores/auth.js';
import { computed, onMounted, ref, watch } from 'vue';
import { getDeliveryAddressById, updateDeliveryAddress } from '@/features/mypage/api.js';
import MyPageHeader from '@/features/mypage/components/common/MyPageHeader.vue';
import { useToast } from 'vue-toastification';

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const authStore = useAuthStore();
const toast = useToast();

const deliveryAddressId = route.params.deliveryAddressId;

const initialData = ref(null);
const isLoading = ref(false);
const userInfo = computed(() => userStore.userInfo || {});

watch(
  () => authStore.accessToken,
  token => {
    if (token) userStore.loadUserInfo();
  },
  { immediate: true }
);

const fetchDeliveryAddress = async () => {
  try {
    isLoading.value = true;
    const token = authStore.accessToken;
    if (!token) return;
    const { data } = await getDeliveryAddressById(token, deliveryAddressId);
    initialData.value = data.data;
  } catch (e) {
    console.log('배송지 상세 조회 실패:', e?.response?.data || e.message);
    alert('배송지 정보를 불러오지 못했습니다.');
    router.push('/mypage/deliveryAddress');
  } finally {
    isLoading.value = false;
  }
};

const handleUpdate = async (payload) => {
  try {
    const token = authStore.accessToken;
    if (!token) return;

    await updateDeliveryAddress(token, deliveryAddressId, payload);
    toast.success('배송지 수정이 완료되었습니다!');
    router.push('/mypage/deliveryaddress');
  } catch (e) {
    console.log('배송지 수정 실패:', e?.response?.data || e.message);
    alert('배송지 수정 중 오류가 발생했습니다.');
  }
};

onMounted(() => {
  fetchDeliveryAddress();
});

</script>

<template>
  <MyPageHeader />
  <div v-if="isLoading">로딩 중입니다...</div>
  <h2 class="title">배송지 수정</h2>
  <DeliveryAddressForm
    v-if="initialData"
    :userInfo="userInfo"
    :initialData="initialData"
    submitLabel="수정"
    :disabled="false"
    @submit="handleUpdate"
  />
</template>

<style scoped>
.title {
  font-size: 1.75rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
}
</style>
