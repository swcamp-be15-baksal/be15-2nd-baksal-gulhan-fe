<script setup>
import { computed, ref } from 'vue';
import CartItemList from '@/features/cart/components/CartItemList.vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart.js';

const router = useRouter()
const cartStore = useCartStore();
const cartItems = computed(() => cartStore.cartItems)
const selectedItemIds = computed(() => cartStore.selectedItemIds);
const showSelectAll = ref(true);
const selectAll = computed({
  get() {
    return selectedItemIds.value.length === cartItems.value.length;
  },
  set(value) {
    if (value) {
      cartStore.toggleSelectAll();
    } else {
      cartStore.selectedItemIds = [];
    }
  }
});




const toggleSelectItem = (id) => {
  cartStore.toggleSelection(id);
};
const totalPrice = computed(() => {
  // 선택된 아이템들만 필터링하여 계산
  return cartItems.value
    .filter(item => selectedItemIds.value.includes(item.id))  // 선택된 아이템들만 필터링
    .reduce((total, item) => total + item.price * item.quantity, 0); // 필터링된 아이템들의 가격 합산
});

const souvenirPrice = computed(() => {
  return cartItems.value
    .filter(item => selectedItemIds.value.includes(item.id) && item.type === '기념품')
    .reduce((total, item) => total + item.price * item.quantity, 0);
});

const packagePrice = computed(() => {
  return cartItems.value
    .filter(item => selectedItemIds.value.includes(item.id) && item.type === '패키지')
    .reduce((total, item) => total + item.price * item.quantity, 0);
});

const deleteAllItems = () =>{
  cartStore.clearCart();
  showSelectAll.value = false;
}
const goToPayInfo = (selectedItems) =>  {
  router.push(`/beforePayment?selectedItems=${JSON.stringify(selectedItems)}`);
}
// 결제 상세 항목 목록
const priceDetails = computed(() => [
  {label : '총 금액', value : totalPrice},
  {label : '기념품 금액', value : souvenirPrice.value},
  {label : '패키지 금액', value: packagePrice.value}
])
function updateItemCount(id, newCount){
  cartStore.updateItemQuantity(id,newCount);
}
</script>

<template>
  <div class="cart-page">
    <div class="cart-content">
      <div class="cart-header">
        <h1 class="cart-title">장바구니</h1>

      </div>
      <!-- 장바구니가 비었을 때 메시지 추가 -->
      <div v-if="cartItems.length === 0" class="empty-cart-message">
        장바구니가 비어 있습니다.
      </div>
      <div class="select-all-wrapper"  v-if="showSelectAll">
        <label>
          <input type="checkbox" v-model="selectAll"/>
          전체 선택
        </label>
        <button class="delete-all-btn" @click="deleteAllItems">전체 삭제</button>

      </div>

      <CartItemList
        :items="cartItems"
        :selectedItemIds="selectedItemIds"
        @updateItemCount="updateItemCount"
        @updateSelected="toggleSelectItem"
      />

      <div class="paymentInfo" v-if="selectedItemIds.length>0">
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
      <button class="complete-purchase" @click="goToPayInfo(selectedItemIds)"  v-if="showSelectAll">구매하기</button>

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
  min-height: 35rem;
  min-width: 50rem;
}

/* cart-title과 버튼을 세로로 정렬 */
.cart-header {
  display: flex;
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

  flex-direction: row; /* 세로 → 가로로 변경 */
  align-items: center; /* 수직 중앙 정렬 */
  justify-content: space-between; /* 양쪽 정렬 */
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
  margin-top: auto; /* 버튼을 항상 맨 아래로 위치시키는 속성 */
}
</style>
