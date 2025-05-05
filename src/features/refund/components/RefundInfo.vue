<script setup>
import { ref } from 'vue';
import { quillEditor } from 'vue3-quill';

const refundReason = ref('');
</script>

<template>
  <div class="refund-info">
    <!-- 제목: "환불하기" -->
    <h2 class="title">환불하기</h2>

    <!-- 환불 정보와 경계선 -->
    <div class="refund-details">
      <p>
        1. 취소 기한은 없지만, 카드사 별로 결제 데이터 보관 기간이 달라서 1년을 초과하면 취소가 안될 수 있습니다.
      </p>
      <p>
        2. 취소는 요청 후 영업일 기준 3~4일이 소요됩니다.
      </p>
      <div class="border-line"></div>
    </div>

    <!-- 구매 정보 -->
    <div class="purchase-info">
      <p>구매한 날짜: 2025-05-05</p>
      <p>주문 번호: 123456789</p>
    </div>

    <!-- 구매한 물품 -->
    <div class="purchase-items">
      <ul>
        <li>상품 1: 상품명</li>
        <li>상품 2: 상품명</li>
        <li>상품 3: 상품명</li>
      </ul>
      <div class="border-line"></div>
    </div>

    <!-- 환불 사유 -->
    <div class="refund-reason">
      <label for="refund-reason">환불 사유</label>
      <quill-editor v-model="refundReason" />
    </div>
  </div>
</template>

<style scoped>
.refund-info {
  font-family: 'Arial', sans-serif;
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.refund-details {
  margin-top: 20px;
}

.refund-details p {
  font-size: 14px;
  line-height: 1.5;
}

.border-line {
  border-top: 1px solid #ccc;
  margin: 20px 0;
}

.purchase-info {
  margin-top: 20px;
}

.purchase-items {
  margin-top: 20px;
}

.refund-reason {
  margin-top: 20px;
}

.quill-editor {
  margin-top: 10px;
}
</style>
