<script setup>
import { computed, onMounted, ref } from 'vue';
import CartItemList from '@/features/cart/components/CartItemList.vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart.js';
import { useToast} from 'vue-toastification';

const router = useRouter()
const cartStore = useCartStore();
const cartItems = computed(() => cartStore.cartItems);
const selectedItems = computed(() => cartStore.selectedItems);
const showSelectAll = ref(true);
const toast = useToast();

// Modal 상태 관리
const showDeleteModal = ref(false);
const showCancelModal = ref(false);
const itemToDelete = ref(null);
onMounted(() => {
  cartStore.fetchCartItems();
});
// 전체 선택 및 선택된 항목 관리
const selectAll = computed({
  get() {
    return selectedItems.value.length === cartItems.value.length;
  },
  set(value) {
    if (value) {
      cartStore.toggleSelectAll();
    } else {
      cartStore.selectedItems = [];
    }
  }
});

// 가격 계산
const totalPrice = computed(() => {
  return cartItems.value
    .filter(item => selectedItems.value.some(selectedItem => selectedItem.cartId === item.cartId))
    .reduce((total, item) => total + item.price * item.quantity, 0);
});

const souvenirPrice = computed(() => {
  return cartItems.value
    .filter(item => selectedItems.value.some(selectedItem => selectedItem.cartId === item.cartId) && item.targetType === 'GOODS')
    .reduce((total, item) => total + item.price * item.quantity, 0);
});
const packagePrice = computed(() => {
  return cartItems.value
    .filter(item => selectedItems.value.some(selectedItem => selectedItem.cartId === item.cartId) && item.targetType === 'PACKAGE')
    .reduce((total, item) => total + item.price * item.quantity, 0);
});

// 전체 삭제
const deleteAllItems = () => {
  showDeleteModal.value = true;
};

// 개별 삭제 확인
const deleteItem = (item) => {
  itemToDelete.value = item;
  showCancelModal.value = true;
};

// 삭제 확정
const confirmDeleteAll = () => {
  cartStore.clearCart();
  showDeleteModal.value = false;
  showSelectAll.value = false;
};

// 삭제 취소
const cancelDeleteAll = () => {
  showDeleteModal.value = false;
};

const cancelDeleteItem = () => {
  showCancelModal.value = false;
};

const confirmDeleteItem = () => {
  cartStore.removeItem(itemToDelete.value.cartId);
  showCancelModal.value = false;
};

// 가격 세부사항
const priceDetails = computed(() => [
  { label: '총 금액', value: totalPrice.value },
  { label: '기념품 금액', value: souvenirPrice.value },
  { label: '패키지 금액', value: packagePrice.value }
]);

const goToPayInfo = () => {
  if (selectedItems.value.length === 0) {
    toast.warning('상품 한 개 이상은 선택해주세요');
    return;
  }
  // priceDetails를 sessionStorage에 저장
  sessionStorage.setItem('priceDetails', JSON.stringify(priceDetails.value));
  // 결제 정보 페이지로 이동
  router.push({ name: 'beforePayment' });
};
</script>

<template>
  <div class="cart-page">
    <div class="cart-content">
      <div class="cart-header">
        <h1 class="cart-title">장바구니</h1>
      </div>
      <div v-if="cartItems.length === 0" class="empty-cart-message">
        장바구니가 비어 있습니다.
      </div>
      <div class="select-all-wrapper" v-if="showSelectAll">
        <label>
          <input type="checkbox" v-model="selectAll" />
          전체 선택
        </label>
        <button class="delete-all-btn" @click="deleteAllItems">전체 삭제</button>
      </div>

      <CartItemList
        :items="cartItems"
        :selectedItems="selectedItems"
        @delete-item="deleteItem"
      />

      <div class="paymentInfo" v-if="selectedItems.length > 0">
        <div class="total-price">
          <span>결제 예상 금액: </span>
        </div>
        <div class="divider"></div>
        <div class="price-details" v-for="(item, index) in priceDetails" :key="index">
          <div class="price-left">
            <span>{{ item.label }}</span>
          </div>
          <div class="price-right">
            <span>{{ item.value }}원</span>
          </div>
        </div>
      </div>
      <button
        class="complete-purchase"
        @click="goToPayInfo"
        v-if="showSelectAll"
      >
        구매하기
      </button>
    </div>

    <!-- Modal Section -->
    <div v-if="showDeleteModal || showCancelModal" class="modal-overlay">
      <div class="modal-content">
        <p v-if="showDeleteModal">모두 삭제하시겠습니까?</p>
        <p v-else>정말 삭제하시겠습니까?</p>
        <div class="modal-actions">
          <button class="modal-btn delete" @click="confirmDeleteAll" v-if="showDeleteModal">전체 삭제</button>
          <button class="modal-btn cancel" @click="cancelDeleteAll" v-if="showDeleteModal">취소</button>
          <button class="modal-btn delete" @click="confirmDeleteItem" v-if="showCancelModal">삭제</button>
          <button class="modal-btn cancel" @click="cancelDeleteItem" v-if="showCancelModal">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 2rem;
}

.cart-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  min-height: 35rem;
  min-width: 50rem;
}

.cart-header {
  display: flex;
  width: 100%;
  padding: 0 1rem;
  margin-bottom: 0.25rem;
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
}

.delete-all-btn:hover {
  background-color: #5D857D;
}

.select-all-wrapper {
  width: 100%;
  padding: 0 1rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.paymentInfo {
  width: 100%;
  padding: 1rem;
  background-color: #ffffff;
  border: 0.0625rem solid #ddd;
  border-radius: 0.5rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  margin-top: auto;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 20rem;
  text-align: center;
  z-index: 1000;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.modal-btn {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  width: 45%;
}

.modal-btn.delete {
  background-color: #ff4747;
}

.modal-btn.delete:hover {
  background-color: #5D857D;
}

.modal-btn.cancel {
  background-color: #888;
}

.modal-btn.cancel:hover {
  background-color: #aaa;
}
</style>
