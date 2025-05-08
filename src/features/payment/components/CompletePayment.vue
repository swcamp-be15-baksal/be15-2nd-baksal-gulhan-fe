<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.js';
import { fetchUserInfo } from '@/features/mypage/api.js';
const router = useRouter();
const route = useRoute()
const responseData = route.state ? route.state.data : null
const authStore = useAuthStore();
const accessToken = authStore.accessToken;
const userinfo = fetchUserInfo(accessToken)

function goToHome(){
  router.push('/')

}
function goToMyPage(){
  router.push('/mypage/orderhistory ')
}


</script>

<template>
  <div class="complement-payment">
    <!-- 주문 완료 메시지 -->
    <div class="order-complete">
      <h2>주문이 완료되었습니다</h2>
      <img src="../../../assets/icons/confirmPayment.png" alt="완료 이미지" class="complete-image" />
    </div>

    <!-- 배송지 정보 -->
    <div class="box address-info">
      <h3>배송지 정보</h3>
      <p><strong>수령인:</strong> {{userinfo.username}}</p>
      <p><strong>휴대폰:</strong> {{userinfo.phone}}</p>
      <p><strong>주소:</strong> {{userinfo.address}}</p>
    </div>

    <!-- 결제 내역 -->
    <div class="box payment-info">
      <h3>결제 내역</h3>
      <p><strong>주문번호:</strong> {{responseData[0]}}</p>
      <p><strong>결제금액:</strong> {{responseData[1]}}</p>
      <p><strong>주문 상품:</strong> {{responseData[2]}}</p>
    </div>

    <!-- 버튼 영역 -->
    <div class="button-group">
      <button class="btn-home" @click="goToHome">홈으로</button>
      <button class="btn-info" @click="goToMyPage">구매내역</button>
    </div>
  </div>
</template>

<style scoped>
.complement-payment {
  max-width: 50rem;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
}

.order-complete {
  margin-bottom: 1.2rem;
}

.complete-image {
  width: 10rem;
  height: auto;
  object-fit: cover;
  border-radius: 50%;
  margin-top: 0.1rem;
}

.box {
  background-color: #f9f9f9;
  padding: 1rem;
  margin-bottom: 1rem;
  text-align: left;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
}

/* 서로 다른 높이 지정 */
.address-info {
  min-height: 10rem;
}

.payment-info {
  min-height: 7rem;
}

h3 {
  margin-bottom: 1rem;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 2rem;
  width: 100%;
}

.btn-home,
.btn-info {
  flex: 1; /* 버튼을 균등하게 배치 */
  padding: 0.7rem 0;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  max-width: 23.5rem; /* 각 버튼의 최대 너비 설정 */
}

/* 홈으로 버튼: 흰 배경, 검정 글씨 */
.btn-home {
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #ccc;
}

/* 구매내역 버튼: 검정 배경, 흰 글씨 */
.btn-info {
  background-color: #000000;
  color: #ffffff;
}
</style>
