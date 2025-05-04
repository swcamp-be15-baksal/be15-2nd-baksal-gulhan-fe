<script setup>
import { reactive, computed } from 'vue';
import CartItemList from '@/features/cart/components/CartItemList.vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const goToPayInfo = () =>  {
  router.push('/beforePayment')
}
const cartItems = reactive([
  { id: "1",image: 'https://d152i3f1t56z95.cloudfront.net/test/image.png', name: "훈민정음 메모지", count:3, price: 5000, type : "기념품"},
  { id: 2 ,image: 'https://d152i3f1t56z95.cloudfront.net/test/image.png', name: "조선지도 마스킹 테이프",count:4, price: 3000, type :"기념품" },
  { id: 3,image: 'https://d152i3f1t56z95.cloudfront.net/test/image.png', name: "경복궁 연필 세트", count:5, price: 2000, type: "기념품" },
]);

const totalPrice = computed(() => {
  return cartItems.reduce((total, item) => total + item.price * item.count, 0);
});

const souvenirPrice = computed(() => {
  return cartItems.filter(item => item.type === '기념품').reduce((total, item) => total + item.price * item.count, 0);
});

const packagePrice = computed(() => {
  return cartItems.filter(item => item.type === '패키지').reduce((total, item) => total + item.price * item.count,0);
});

// 결제 상세 항목 목록
const priceDetails = computed(() => [
  {label : '총 금액', value : totalPrice},
  {label : '기념품 금액', value : souvenirPrice.value},
  {label : '패키지 금액', value: packagePrice.value}
])
function updateItemCount(id, newCount){
  const item = cartItems.find(i => i.id === id);
  if (item) item.count = newCount;
}
</script>
<template>
  <div class="cart-page">
    <div class="cart-content">
      <div class="cart-header">
        <h1 class="cart-title">장바구니</h1>
        <button class="delete-all-btn" @click="deleteAllItems">전체 삭제</button>

      </div>
      <div class="select-all-wrapper">
        <label>
          <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
          전체 선택
        </label>
      </div>

      <CartItemList
        :items="cartItems"
        @updateItemCount="updateItemCount"
      />

      <div class="paymentInfo">
        <div class="total-price">
          <span>결제 예상 금액: </span>
        </div>
        <div class="divider"></div>
        <div class="price-details" v-for="(item, index) in priceDetails" :key="index">
          <div class="price-left">
            <span>{{item.label}}</span>
          </div>

          <div class="price-right">
            <span>{{item.value}}원</span>
          </div>
        </div>

      </div>
      <button class="complete-purchase" @click="goToPayInfo">구매 완료</button>

    </div>
  </div>


</template>

<style scoped>
.cart-page {
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 2rem; /* 스크롤 시 위 공간 확보 */
}

.cart-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem; /* 간격을 줄임 */
}

/* cart-title과 버튼을 세로로 정렬 */
.cart-header {
  display: flex;
  flex-direction: row; /* 세로 → 가로로 변경 */
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: space-between; /* 양쪽 정렬 */
  width: 100%;
  padding: 0 1rem; /* 좌우 패딩 */
  margin-bottom: 0.25rem; /* 장바구니와 다른 항목 간의 간격을 줄임 */
}

.cart-title {
  font-size: 2rem;
  font-weight: bold;
}

.delete-all-btn {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #ff4747;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-all-btn:hover {
  background-color: #e63636;
}

.select-all-wrapper {
  width: 100%;
  padding: 0 1rem;
  margin-top: 0.25rem; /* 전체 선택과 장바구니 간의 간격을 좁힘 */
  margin-bottom: 0.25rem; /* 전체 선택과 아래 항목 간격을 좁힘 */
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
/* 결제 예상 금액 상자 */
.paymentInfo {
  width: 100%;
  padding: 1rem;
  background-color: #ffffff;
  border: 0.0625rem solid #ddd; /* 1px -> 0.0625rem */

  border-radius: 0.5rem;

  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.total-price {
  font-size: 1.5rem;
  font-weight: bold;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 1rem 0;
}

.price-details {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1.2rem;
}

.price-left {
  font-weight: bold;
  text-align: left;
  width: 50%;
}

.price-right {
  text-align: right;
  width: 50%;
}

.complete-purchase {
  width: 27.5rem;
  height: 3.5rem;
  background-color: #000000;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
