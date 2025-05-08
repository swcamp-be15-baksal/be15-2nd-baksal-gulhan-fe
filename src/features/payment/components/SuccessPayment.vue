<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.js';
import { confirmWidget, saveOrder, saveOrderHistory } from '@/features/payment/api/payment.js';

const urlParams = new URLSearchParams(window.location.search);
const authStore = useAuthStore();
const props = defineProps({
  selectedItems: {
    type: Array,
    required: true
  }
});

const accessToken = authStore.accessToken;
const router = useRouter();
const amount = ref(Number(urlParams.get('amount')));
const orderId = ref(urlParams.get('orderId'));
const paymentKey = ref(urlParams.get('paymentKey'));
const responseData = ref(null);
const result = [];

const confirmPayment = async () => {
  const requestData = {
    paymentKey: paymentKey.value,
    orderId: orderId.value,
    amount: amount.value,
  };
  try {
    const response = await confirmWidget(accessToken, requestData);

    // 👇 객체 그대로 저장
    responseData.value = response.data;

    // 👇 정상적으로 속성에 접근
    result.push(responseData.value.orderId);
    result.push(responseData.value.totalAmount);
    result.push(decodeURIComponent(responseData.value.orderName));
  } catch (err) {
    console.error('에러 발생:', err);
    window.location.href = `/widget/fail?message=${err.message}&code=${err.code}`;
  }
};

const sendPaymentData = async () => {
  const requestData = {
    orderCode: paymentKey.value,
    totalPrice: amount.value,
    orderId: orderId.value,
  };
  await saveOrder(accessToken, requestData);

  const requestOrderData = {
    orderItem: props.selectedItems
  };
  await saveOrderHistory(accessToken, requestOrderData.orderItem);
};

const goToResult = () => {
  if (result.length > 0) {
    router.push({
      name: 'paymentResult',
      query: {
        orderId: result[0],
        totalAmount: result[1],
        orderName: result[2]
      }
    });

  } else {
    console.error('Result 데이터가 아직 준비되지 않았습니다!');
  }
};

const navigateToDocs = () => {
  window.location.href = 'https://docs.tosspayments.com/guides/v2/payment-widget/integration';
};

const navigateToDiscord = () => {
  window.location.href = 'https://discord.gg/A4fRFXQhRu';
};

onMounted(async () => {
  await confirmPayment();
  await sendPaymentData();
});
</script>

<template>
  <div class="box_section w-600">
    <img width="100px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" />
    <h2>결제를 완료했어요</h2>

    <div class="p-grid typography--p mt-50">
      <div class="p-grid-col text--left"><b>결제금액</b></div>
      <div class="p-grid-col text--right">{{ amount }}원</div>
    </div>
    <div class="p-grid typography--p mt-10">
      <div class="p-grid-col text--left"><b>주문번호</b></div>
      <div class="p-grid-col text--right">{{ orderId }}</div>
    </div>
    <div class="p-grid typography--p mt-10">
      <div class="p-grid-col text--left"><b>paymentKey</b></div>
      <div class="p-grid-col text--right" style="white-space: initial; width: 250px">{{ paymentKey }}</div>
    </div>

    <div class="button-group">
      <button class="button" @click="navigateToDocs">연동 문서</button>
      <button class="button btn-discord" @click="navigateToDiscord">실시간 문의</button>
    </div>

    <div class="button-confirm">
      <button class="button" @click="goToResult">확인</button>
    </div>
  </div>

  <div class="box_section w-600 text--left">
    <b>Response Data :</b>
    <div v-text="JSON.stringify(responseData, null, 4)" style="white-space: initial"></div>
  </div>
</template>

<style scoped>
.button-group {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 30px;
}

.button-confirm {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.button {
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 6px;
  border: none;
  background-color: #3182f6;
  color: white;
  cursor: pointer;
}

.button:hover {
  background-color: #2563eb;
}

.btn-discord {
  background-color: #5865f2;
}

.btn-discord:hover {
  background-color: #4752c4;
}
</style>
