<script setup>
import { ref } from 'vue'

const shippingInfo = ref({
  name: '홍길동',
  address: '서울특별시 은평구 응암동 1010 번지 109동 3202호',
  phone: '010-1234-5678'
})

const orderItems = ref([
  { name: '상품 A', quantity: 2, price: 10000 },
  { name: '상품 B', quantity: 1, price: 15000 }
])
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
        <span class="item-name">{{ item.name }}</span>
        <span class="item-quantity">{{ item.quantity }}개</span> (
        <span class="item-price">{{ item.price }}원</span> )
      </div>
    </div>
  </div>

</template>

<style scoped>
.delivery-info {
  border: 0.0625rem solid #ddd; /* 1px -> 0.0625rem */
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
  border: 0.0625rem solid #ddd;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 1rem;
}

.item-name, .item-quantity, .item-price {
  display: inline-block;
}
</style>
