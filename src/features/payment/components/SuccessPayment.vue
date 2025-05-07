<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth.js';
import { confirmWidget, saveOrder, saveOrderHistory } from '@/features/payment/api/payment.js';
import { useCartStore } from '@/stores/cart.js';

const urlParams = new URLSearchParams(window.location.search);
const authStore = useAuthStore();
const cartStore = useCartStore();


const accessToken = authStore.accessToken;
const selectedItems = cartStore.selectedItems;
const amount = ref(urlParams.get('amount'));
const orderId = ref(urlParams.get('orderId'));
const paymentKey = ref(urlParams.get('paymentKey'));
const responseData = ref(null);
/*
const showCancelButton = ref(false);
const showCancelButton2 = ref(false);
*/

const confirmPayment = async () => {
  const requestData = {
    paymentKey: paymentKey,
    orderId: orderId,
    amount: amount,
  };

  try {
    const response = await confirmWidget(accessToken, requestData)
    const json = await response.json();
    if (!response.ok) {
      throw { message: json.message, code: json.code };
    }
    responseData.value = JSON.stringify(json, null, 4);
  } catch (err) {
    window.location.href = `/widget/fail?message=${err.message}&code=${err.code}`;
  }
};

const sendPaymentData = async () => {
  const requestData = {
    orderCode: paymentKey,
    totalPrice: amount,
    orderId: orderId,
  };

  await saveOrder(accessToken,requestData)

  const requestOrderData = {
    orderItem: selectedItems
  }
  await saveOrderHistory(accessToken, requestOrderData);
};

/*
const cancelPayment = async () => {
  const cancelRequestData = {
    cancelReason: '사용자 요청으로 취소',
  };

  await fetch('/api/v1/s1/payment/cancel', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cancelRequestData),
  });
};

const cancelPayment2 = async () => {
  const cancelRequestData2 = {
    cancelReason: '사용자 요청으로 취소',
    amount: 5300,
  };

  const response = await fetch('/api/v1/s1/payment/cancel', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cancelRequestData2),
  });

  if (!response.ok) {
    console.error(`Error: ${response.status} - ${response.statusText}`);
  } else {
    const data = await response.json();
    console.log('Success:', data);
  }
};
*/

/*const onPaymentSuccess = () => {
  showCancelButton.value = true;
};

const successPartial = () => {
  showCancelButton2.value = true;
};*/

onMounted(() => {
  confirmPayment();
  sendPaymentData();
  /*onPaymentSuccess();
  successPartial();*/
});

const navigateToDocs = () => {
  window.location.href = 'https://docs.tosspayments.com/guides/v2/payment-widget/integration';
};

const navigateToDiscord = () => {
  window.location.href = 'https://discord.gg/A4fRFXQhRu';
};
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

    <div class="p-grid mt-30">
      <button class="button p-grid-col5" @click="navigateToDocs">연동 문서</button>
      <button class="button p-grid-col5 btn-discord" @click="navigateToDiscord">실시간 문의</button>
    </div>
  </div>

  <div class="box_section w-600 text--left">
    <b>Response Data :</b>
    <div v-text="responseData" style="white-space: initial"></div>
  </div>


</template>


