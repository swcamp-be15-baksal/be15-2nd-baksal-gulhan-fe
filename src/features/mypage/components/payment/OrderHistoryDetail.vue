<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const confirmPurchase = (item) => {
  item.status = 'confirmed'
}

const toggleDelivery = (item) => {
  item.showDelivery = !item.showDelivery
}
</script>

<template>
  <div class="order-detail">
    <div class="order-date">
      <p><strong>주문번호:</strong> {{ order.id }}</p>
      <p><strong>구매일자:</strong> {{ order.purchasedAt.toISOString().slice(0, 10).replace(/-/g, '.') }}</p>
    </div>

    <div class="items">
      <div v-for="item in order.items" :key="item.id" class="item">
        <div class="status">{{ item.status === 'waiting' ? '구매 대기' : '구매 확정' }}</div>
        <div class="item-content">
          <img :src="item.image" alt="item image" />
          <div class="info">
            <h4>{{ item.name }}</h4>
            <p>{{ item.description }}</p>
            <p>수량: {{ item.quantity }}</p>
            <p>가격: {{ item.price.toLocaleString() }}원</p>
          </div>
        </div>
        <div class="actions">
          <button @click="toggleDelivery(item)">배송조회</button>
          <button>결제취소</button>
        </div>
        <button v-if="item.status === 'waiting'" @click="confirmPurchase(item)" class="confirm-button">구매 확정</button>
        <button v-if="item.status === 'confirmed'" class="review-button">리뷰 쓰기</button>
        <div v-if="item.showDelivery" class="delivery">송장번호: 1234567890</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-detail {
  width: 100%;
  padding: 1rem;
  background-color: #fafafa;
}

.order-date {
  margin-bottom: 1rem;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item {
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: white;
}

.status {
  font-weight: bold;
}

.item-content {
  display: flex;
  gap: 1rem;
}

.item-content img {
  width: 7rem;
  height: 7rem;
  object-fit: cover;
  border-radius: 0.375rem;
}

.info {
  flex: 1;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.actions button {
  flex: 1;
  padding: 0.75rem;
  background-color: #f2f2f2;
  cursor: pointer;
  border-radius: 0.375rem;
  border: none;
}

.confirm-button {
  background-color: #000;
  color: white;
  padding: 1rem;
  border-radius: 0.375rem;
  margin-top: 1rem;
}

.confirm-button:hover {
  background-color: #333;
}

.review-button {
  background-color: #e57575;
  color: white;
  padding: 1rem;
  border-radius: 0.375rem;
  margin-top: 1rem;
}

.review-button:hover {
  background-color: #c05252;
}

.delivery {
  margin-top: 0.5rem;
  color: #007bff;
}
</style>
