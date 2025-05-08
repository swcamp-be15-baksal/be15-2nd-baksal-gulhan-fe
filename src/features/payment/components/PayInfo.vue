<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth.js';
import { fetchUserInfo } from '@/features/mypage/api.js';
const authStore = useAuthStore();
const accessToken = authStore.accessToken
const props = defineProps({
  orderItems: {
    type: Array,
    required: true
  },
  priceDetails:{
    type: Array,
    required: true
  }
});
const submitemit = defineEmits(['submit-payment']);
const totalAmount = computed(() => {
  const totalItem = props.priceDetails.find(item => item.label === '총 금액');
  return totalItem ? totalItem.value : 0;
});

const point = ref(0);
const fetchPoint = async () =>{
  const resp = await fetchUserInfo(accessToken);
  point.value = resp.data.data.point;
}
// 보유 적립금
const totalPoints = point;
// 사용한 적립금
const usedPoints = ref(0);
// 할인 금액 계산
const discountAmount = computed(() => usedPoints.value);

// 적립금 입력 시 할인 금액 업데이트
const updateDiscount = () => {
  // 사용한 적립금이 보유 적립금을 넘지 않도록 설정
  if (usedPoints.value > totalPoints.value) {
    usedPoints.value = totalPoints.value;
  }
};
onMounted(async () => {
  await fetchPoint();

})
const onSubmit = () => {
  const finalAmount = totalAmount.value - discountAmount.value;
  const items = props.orderItems.map(item => item.name);
  submitemit('submit-payment',{
    amount: finalAmount,
    itemName: items
  });
}


</script>

<template>
  <div class="payinfo-detail">
    <h3 class="title">결제 정보</h3>
    <div v-for="(item, index) in priceDetails" :key="index">
      <p>{{ item.label }}: {{ item.value }}원</p>
    </div>

    <hr class="divider" />

    <div class="point-use">
      적립금 사용 <span class="point">(보유 적립금: {{ totalPoints }}원)</span>
      <input
        type="text"
        class="point-input"
        v-model="usedPoints"
        placeholder="사용할 적립금 입력"
        :max="totalPoints"
      @input="updateDiscount"
      />
    </div>

    <!-- 할인 금액 -->
    <div class="info-line">
      <span>할인 금액</span>
      <span>{{ discountAmount }}원</span> <!-- 실제 할인 적용 금액 -->
    </div>
    <div class="info-line">
      <span>결제 금액</span>
      <span>{{ totalAmount - discountAmount }}원</span>
    </div>

    <hr class="divider" />

    <div class="button-container">
      <button class="dopayment" @click="onSubmit">결제하기</button>
    </div>
  </div>
</template>


<style scoped>
.payinfo-detail {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 32rem;
  margin: auto;
}

.title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: left;
}

.info-line {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 1rem;
}

.divider {
  border: none;
  border-top: 0.1rem solid #ccc;
  margin: 1rem 0;
}

.point-use {
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.point {
  font-size: 0.9rem;
  color: #666;
  margin-left: 0.5rem;
}

.point-input {
  padding: 0.5rem;
  border: 0.1rem solid #ccc;
  border-radius: 0.25rem;
  background-color: white;
}

.button-container {
  margin-top: 1rem;
}

.dopayment {
  background-color: #000000;
  color: #ffffff;
  padding: 0.75rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  font-size: 1rem;
}
</style>
