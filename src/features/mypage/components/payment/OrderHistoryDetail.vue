<script setup>
defineProps({
  order: {
    type: Object,
    required: true
  },
  recipient: {
    type: Object,
    required: true
  }
})

const confirmPurchase = (item) => {
  item.status = 'confirmed'
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

    <div class="items">
      <h5>상품 정보</h5>

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
  margin-bottom: 1rem; /* 간격을 조금 줄였습니다 */
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
  margin-bottom: 1.5rem;
  width: 52rem;
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
  gap: 1.5rem; /* 간격을 줄였습니다 */
}

.item {
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 1.5rem;
  background-color: #fafafa;
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
  background-color: #333;
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
  background-color: #c05252;
}
</style>
