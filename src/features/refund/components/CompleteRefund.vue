<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const goToOrderHistory = () => {
  router.push('/mypage/orderhistory');
};
</script>

<template>
  <div class="complete-refund-container">
    <div class="complete-refund">
      <h2 class="refund-completed">환불 신청이 완료되었습니다.</h2>

      <div class="refund-info-box">
        <p class="refund-info-message">
          환불 상태에 대한 확인은 구매내역 페이지에서 확인하실 수 있습니다.
        </p>
      </div>

      <div class="order-history-link">
        <button @click="goToOrderHistory" class="go-to-order-history">
          구매내역 바로가기
        </button>
      </div>

      <img
        src="../../../assets/icons/confirmExchange.png"
        alt="환불 이미지"
        class="confirmation-image"
      />

      <div class="submit-confirmation">
        <button class="confirmation-button">확인</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.complete-refund-container {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.complete-refund {
  width: 52rem;
  padding: 1rem;
}

.refund-completed {
  text-align: center;
  color: #888;
  margin-bottom: 1rem;
}

.refund-info {
  text-align: center;
  color: #888;
  margin-bottom: 2rem;
}

.refund-info-box {
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.refund-info-message {
  text-align: center;
  color: #888;
}

.order-history-link {
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  margin-bottom: 1rem;
}

.go-to-order-history {
  background-color: transparent;
  color: #777777;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  text-decoration: none; /* 링크 스타일 제거 */
}

.confirmation-image {
  display: block;
  margin: 2rem auto 2rem auto; /* 위와 아래에 마진 추가 */
  width: 15rem; /* 이미지 크기 확대 */
  height: auto;
}

.submit-confirmation {
  display: flex;
  justify-content: center;
  margin-top: 9rem; /* 확인 버튼과 이미지를 떨어뜨리기 위해 마진 추가 */
}

.confirmation-button {
  width: 23.5rem;
  height: 3.5rem;
  background-color: #3e4042; /* 버튼 색상 수정 */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.confirmation-button:hover {
  background-color: #5D857D;
}
</style>
