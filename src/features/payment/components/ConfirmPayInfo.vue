<script setup>
import { ref } from 'vue'

const props = defineProps({
  orderItems: {
    type: Array,
    required: true
  }
})
const shippingInfo = ref({
  name: '홍길동',
  address: '서울특별시 은평구 응암동 1010 번지 109동 3202호',
  phone: '010-1234-5678'
})
</script>

<template>
  <div>
    <p id="delivery-name">배송지</p>
    <div class="delivery-info">
      <p>{{ shippingInfo.name }}</p>
      <p>{{ shippingInfo.address }}</p>
      <p>{{ shippingInfo.phone }}</p>
    </div>

    <p id="orderItem-name">주문 상품</p>
    <div class="order-items">
      <div v-for="(item, index) in orderItems" :key="index" class="order-item">
        <div class="item-image">
          <img :src="item.image" alt="상품이미지"/>
        </div>
        <div class="item-info">
          <span class="item-type">{{ item.type }}</span>
          <span class="item-name">{{ item.title }}</span>
        </div>
        <div class="item-quantity">{{ item.quantity }}개</div>
        <div class="item-price">{{ item.price * item.quantity}}원</div>
      </div>
    </div>

    <div class="agreement-list">
      <label class="agreement-item">
        <input type="checkbox" /> 주문 내용 및 결제 동의 (필수)
      </label>
      <div class="agreement-item">
        <span class="check-symbol">✔</span> 개인정보 수집·이용 동의 (필수)
      </div>
      <div class="agreement-item">
        <span class="check-symbol">✔</span> 개인정보 제3자 정보 제공 동의 (필수)
      </div>
      <div class="agreement-item">
        <span class="check-symbol">✔</span> 결제대행 서비스 이용약관 동의 (필수)
      </div>
    </div>
  </div>
</template>

<style scoped>
.delivery-info {
  border: 0.0625rem solid #ddd;
  padding: 1rem 0 1rem 1rem; /* 경계선과 글자 사이에 1rem 간격 추가 */
  background-color: white;
  border-radius: 0.5rem;
  width: 50rem ;
  height : 9rem;
}
#delivery-name{
  font-weight: bold;
}

#orderItem-name{
  margin-top: 2rem;
  font-weight: bold;
  border-top: 0.0625rem solid #ccc;
}

.order-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0.0625rem solid #ddd;
  border-radius: 0.3125rem;
  background-color: #fff;
  width: 52rem;
  height: 12rem;
  padding: 1rem 2rem; /* 좌우 여백 증가 */
  margin-bottom: 1rem;
  gap: 1.5rem;
}

.item-name, .item-quantity, .item-price {
  display: inline-block;
}

.item-image {
  width: 7rem;
  height: 7rem;
  overflow: hidden;
  border-radius: 0.5rem;
  margin-right: 1rem;
}
.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1.5;
  gap: 0.3rem;
}

.item-type {
  font-size: 0.9rem;
  color: #888;
}
.item-name {
  font-weight: bold;
}

.agreement-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-left: 0.5rem;
}

.agreement-item {
  font-size: 0.95rem;
  color: #333;
  display: flex;
  align-items: center;
}

.agreement-item input[type="checkbox"] {
  margin-right: 0.5rem;
  width: 1rem;
  height: 1rem;
}

.check-symbol {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  color: green;
  font-weight: bold;
}
</style>
