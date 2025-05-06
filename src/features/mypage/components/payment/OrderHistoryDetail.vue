<script setup>
import { ref } from 'vue';

defineProps({
  order: {
    type: Object,
    required: true
  },
  recipient: {
    type: Object,
    required: true
  }
});

const showModal = ref(false);
const itemToConfirm = ref(null);

const confirmPurchase = (item) => {
  itemToConfirm.value = item;
  showModal.value = true;  // 모달을 표시
}

const handleConfirm = () => {
  if (itemToConfirm.value) {
    itemToConfirm.value.status = 'confirmed';  // 구매 확정
  }
  showModal.value = false;  // 모달 닫기
}

const handleCancel = () => {
  showModal.value = false;  // 모달 닫기
}
</script>

<template>
  <div class="order-detail">
    <!-- 상품 정보 (주문번호, 구매일자) -->
    <div class="product-info">
      <div class="order-date">
        <p><strong>주문번호:</strong> {{ order.id }}</p>
        <p>{{ order.purchasedAt.toISOString().slice(0, 10).replace(/-/g, '.') }}</p>
      </div>
    </div>

    <!-- 배송지 정보 -->
    <div class="shipping-info">
      <h3 class="shipping-title">배송지</h3>
      <div class="divider"></div>
      <div class="shipping-box">
        <p><strong>이름:</strong> {{ recipient.name }}</p>
        <p><strong>주소:</strong> {{ recipient.address }}</p>
        <p><strong>연락처:</strong> {{ recipient.phone }}</p>
      </div>
    </div>

    <!-- 상품 정보 및 목록 -->
    <div class="items">
      <p>상품 정보</p>
      <div class="items-divider"></div>
      <div v-for="item in order.items" :key="item.id" class="item">
        <div class="status">{{ item.status === 'waiting' ? '구매 대기' : '구매 확정' }}</div>

        <div class="item-row">
          <img :src="item.image" alt="item image" />

          <div class="text-group">
            <div class="category">{{ order.category }}</div>
            <div class="name">{{ item.name }}</div>
          </div>

          <div class="quantity-price-wrapper">
            <div class="quantity">{{ item.quantity }}개</div>
            <div class="price">{{ item.price.toLocaleString() }}원</div>
          </div>
        </div>

        <button
          v-if="item.status === 'waiting'"
          @click="confirmPurchase(item)"
          class="confirm-button"
        >
          구매 확정
        </button>
        <button
          v-else
          class="review-button"
        >
          리뷰 쓰기
        </button>
      </div>
    </div>

    <!-- 모달 -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <p>구매 확정하시겠습니까?</p>
        <div class="modal-buttons">
          <button @click="handleConfirm" class="confirm-btn">구매 확정</button>
          <button @click="handleCancel" class="cancel-btn">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-detail {
  width: 52rem;
  padding: 1rem;
  margin: 0 auto;
}

/* 상품 정보 스타일 */
.product-info {
  width: 52rem;
  margin: 0 auto;
  margin-bottom: 2rem;
}

.product-info h3 {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.order-date {
  margin-bottom: 1rem;
  color: #555;
}

/* 배송지 정보 스타일 */
.shipping-info {
  width: 52rem;
  margin: 0 auto;
}

.shipping-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.divider {
  border-top: 1px solid #ddd;
  margin-bottom: 1rem;
}

.shipping-box {
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 0.5rem;
  width: 100%;
  color: #444;
}

/* 상품 목록 스타일 */
.items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 52rem;
  margin-top: 0.5rem;
}

.items p {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.3rem;
}

.items-divider {
  border-top: 1px solid #ccc;
  margin-bottom: 1rem;
}

.item {
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  background-color: #fafafa;
  padding: 1rem;
}

.status {
  font-weight: bold;
  margin-bottom: 1rem;
  color: #555;
}

.item-row {
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: space-between;
}

.item-row img {
  width: 7rem;
  height: 7rem;
  object-fit: cover;
  border-radius: 0.375rem;
}

.text-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  color: #333;
  flex-grow: 1;
}

.category {
  font-size: 0.85rem;
  font-weight: bold;
  color: #888;
}

.name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #444;
}

.quantity-price-wrapper {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: auto;
  padding-right: 1rem;
}

.quantity,
.price {
  font-size: 1rem;
  color: #777;
}

.price {
  margin-left: auto;
  font-weight: 600;
}

.confirm-button {
  background-color: #000;
  color: white;
  padding: 1rem;
  border-radius: 0.375rem;
  margin-top: 1rem;
  width: 100%;
  border: none;
  cursor: pointer;
}

.confirm-button:hover {
  background-color: #5D857D;
}

.review-button {
  background-color: #e57575;
  color: white;
  padding: 1rem;
  border-radius: 0.375rem;
  margin-top: 1rem;
  width: 100%;
  border: none;
  cursor: pointer;
}

.review-button:hover {
  background-color: #5D857D;
}

/* 모달 스타일 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  width: 20rem;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
}

.confirm-btn,
.cancel-btn {
  padding: 1rem;
  width: 48%;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
}

.confirm-btn {
  background-color: #000;
  color: white;
}

.confirm-btn:hover {
  background-color: #5D857D;
}

.cancel-btn {
  background-color: #ccc;
  color: #333;
}

.cancel-btn:hover {
  background-color: #5D857D;
}
</style>
