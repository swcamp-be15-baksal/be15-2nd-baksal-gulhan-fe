<script setup>
import '@/features/payment/css/style.css';
import { ref, onMounted } from 'vue';
import { getKey, getValue } from '@/features/payment/api/payment.js';
import { useAuthStore } from '@/stores/auth.js';
import { fetchUserInfo } from '@/features/mypage/api.js';

const props = defineProps({
  selectedItems: {
    type: Array,
    required: true
  },
  paymentInfo: {
    type: Array,
    required: true
  }
});

// TossPayments 관련 상태 변수
const tossPaymentsInstance = ref(null);
const widgetsInstance = ref(null);
const customerKey = ref(generateRandomString());

const couponApplied = ref(false);
const amount = ref(0);
const orderId = ref(null);
const isPaymentDisabled = ref(false);
const authStore = useAuthStore();
const accessToken = authStore.accessToken;

// 외부 스크립트 로드
const loadTossPaymentsSDK = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://js.tosspayments.com/v2/standard';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (error) => reject(error);
    document.head.appendChild(script);
  });
};

// 결제 위젯 초기화
const initializePaymentWidget = async () => {
  try {
    const response = await getValue(accessToken);
    amount.value = props.paymentInfo.amount;
    orderId.value = response.data.orderId;

    const keyResponse = await getKey(accessToken);
    const clientKey = keyResponse.data.keyValue;

    const tossPayments = TossPayments(clientKey);
    tossPaymentsInstance.value = tossPayments;

    const widgets = tossPayments.widgets({ customerKey: customerKey.value });
    widgetsInstance.value = widgets;

    await widgets.setAmount({ currency: 'KRW', value: amount.value });

    await Promise.all([
      widgets.renderPaymentMethods({
        selector: '#payment-method',
        variantKey: 'DEFAULT'
      }),
      widgets.renderAgreement({
        selector: '#agreement',
        variantKey: 'AGREEMENT'
      })
    ]);

    couponApplied.value = false;
  } catch (err) {
    console.error('결제 위젯 초기화 실패:', err);
  }
};

// 금액 변경
const updateAmount = async (newAmount) => {
  const widgets = widgetsInstance.value;
  if (!widgets) return;

  await widgets.setAmount({
    currency: 'KRW',
    value: newAmount,
  });
};

// 쿠폰 체크
const handleCouponChange = async () => {
  const couponAmount = couponApplied.value ? 5000 : 0;
  await updateAmount(amount.value - couponAmount);
};

// 결제 요청
const handlePayment = async () => {
  try {
    const userinfo = await fetchUserInfo(accessToken);
    const username = userinfo.data.data.username;
    const email = userinfo.data.data.email;
    const items = props.selectedItems;
    const orderName =
      items.length === 1
        ? items[0].name
        : items.length > 1
          ? `${items[0].name} 외 ${items.length - 1}건`
          : '상품';

    const widgets = widgetsInstance.value;
    if (!widgets) {
      console.error("결제 위젯이 초기화되지 않았습니다.");
      return;
    }

    await widgets.requestPayment({
      orderId: orderId.value,
      orderName: orderName, // 수정 필요
      successUrl:  `${window.location.origin}/widget/success?accessToken=${accessToken}`,
      failUrl: `${window.location.origin}/widget/fail?accessToken=${accessToken}`,
      customerEmail: email,
      customerName: username,
    });
  } catch (err) {
    console.error('결제 요청 실패:', err);
  }
};

// 결제창 리디렉션
const redirectToBrandPay = () => {
  location.href = '/brandpay/checkout.html';
};
const redirectToPaymentWindow = () => {
  location.href = '/payment/checkout.html';
};

// 랜덤 customerKey 생성
function generateRandomString() {
  return window.btoa(Math.random()).slice(0, 20);
}

// 마운트 시 SDK 로딩 및 초기화
onMounted(async () => {
  await loadTossPaymentsSDK();
  await initializePaymentWidget();
});
</script>


<template>
    <div class="wrapper">
        <!-- 주문서 영역 -->
        <div class="box_section">
            <!-- 결제 UI -->
            <div id="payment-method"></div>
            <!-- 이용약관 UI -->
            <div id="agreement"></div>
            <!-- 쿠폰 체크박스 -->
            <div class="coupon-container">
                <div class="checkable typography--p">
                    <label for="coupon-box" class="checkable__label typography--regular">
                        <input
                            id="coupon-box"
                            class="checkable__input"
                            type="checkbox"
                            v-model="couponApplied"
                            @change="handleCouponChange" />
                        <span class="checkable__label-text">포인트 적용</span>
                    </label>
                </div>
            </div>
            <!-- 결제하기 버튼 -->
          <button class="button" @click="handlePayment" :disabled="isPaymentDisabled">
                결제하기
            </button>
        </div>
        <div class="box_section">
            <!-- 브랜드페이만 연동하기 -->
            <button class="button" @click="redirectToBrandPay">
                위젯 없이 브랜드페이만 연동하기
            </button>
            <!-- 결제창만 연동하기 -->
            <button class="button" @click="redirectToPaymentWindow">
                위젯 없이 결제창만 연동하기
            </button>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
}

.box_section {
    margin: 1rem;
    width: 100%;
}

.button {
    background-color: #007aff;
    color: white;
    padding: 0.8rem 1.6rem;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    width: 100%;
    max-width: 20rem;
    margin-top: 1rem;
}

.button:disabled {
    background-color: #dcdcdc;
    cursor: not-allowed;
}

.coupon-container {
    margin-top: 1.5rem;
}
</style>
