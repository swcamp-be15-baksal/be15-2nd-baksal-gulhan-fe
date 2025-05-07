<script setup>

import DeliveryAddressForm from '@/features/mypage/components/form/delivery/DeliveryAddressForm.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createDeliveryAddress } from '@/features/mypage/api.js';
import { useAuthStore } from '@/stores/auth.js';
import { useToast } from 'vue-toastification';

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const isSubmitting = ref(false);
const error = ref(null);

const handleCreate = async (payload) => {
  console.log('payload:', payload);
  const token = authStore.accessToken;
  isSubmitting.value = true;
  error.value = null;
  try {
    const resp = await createDeliveryAddress(token, payload);
    console.log(resp);
    toast.success('배송지 등록이 완료되었습니다!');
    await router.push(`/mypage/deliveryaddress`);
  } catch (e) {
    console.log('배송지 등록 실패', e);
    error.value = '배송지 등록에 실패하였습니다.';
  }
  isSubmitting.value = false;
}
</script>

<template>
  <h2 class="title">배송지 등록</h2>
  <DeliveryAddressForm
    :initialData="null"
    :submitLabel="isSubmitting ? '등록 중...' : '등록'"
    :disabled="isSubmitting"
    @submit="handleCreate"
  />
  <div v-if="error" class="error">{{ error }}</div>
</template>

<style scoped>
.title {
  font-size: 1.75rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
}
</style>
