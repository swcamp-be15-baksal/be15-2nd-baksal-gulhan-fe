<script setup>

import DeliveryAddressForm from '@/features/mypage/components/DeliveryAddressForm.vue';
import { onMounted, ref } from 'vue';

const initialData = ref(null);

onMounted(async () => {

  // 테스트용
  initialData.value = {
    receiver : '윤채영',
    postcode : '12345',
    address : '주소주소주소주소주소1',
    detailAddress : '상세주소상세주소1',
    phone : '010-1234-5678',
    isDefault: 'Y'
  };

  // TODO: fetch 주소 정보 API 호출하고 initialData.value 채우기
});
</script>

<template>
  <h2 class="title">배송지 수정</h2>
  <DeliveryAddressForm
    :initialData="initialData"
    submitLabel="수정"
    :disabled="false"

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
