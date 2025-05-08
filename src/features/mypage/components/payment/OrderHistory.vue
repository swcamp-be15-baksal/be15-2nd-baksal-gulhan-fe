<script setup>
import { ref, computed, onMounted } from 'vue';
import DatePicker from 'vue3-datepicker';
import { useRouter } from 'vue-router';
import { getMyOrderHistory } from '@/features/mypage/api.js';
import { useAuthStore } from '@/stores/auth.js';

const router = useRouter();

const now = new Date();
const selectedDate = ref(null);
const selectedCategory = ref('기념품');
const selectedDateRange = ref('1month');

const showModal = ref(false);
const itemToCancel = ref(null);
const showConfirmModal = ref(false);
const itemToConfirm = ref(null);

const purchases = ref([]);
const loading = ref(true);
const error = ref(null);

const dateLimit = computed(() => {
  const limit = new Date(now);
  switch (selectedDateRange.value) {
    case '1month':
      limit.setMonth(now.getMonth() - 1);
      break;
    case '3month':
      limit.setMonth(now.getMonth() - 3);
      break;
    case '1year':
      limit.setFullYear(now.getFullYear() - 1);
      break;
  }
  return limit;
});

const isValidDate = (purchaseDate, selected) => {
  if (!selected) return true;
  const selectedDateObj = new Date(selected);
  return purchaseDate.toISOString().slice(0, 10) === selectedDateObj.toISOString().slice(0, 10);
};

const filteredPurchases = computed(() => {
  return purchases.value.filter(p => {
    const purchaseDate = new Date(p.purchasedAt);
    return (
      p.category === selectedCategory.value &&
      isValidDate(purchaseDate, selectedDate.value) &&
      purchaseDate >= dateLimit.value
    );
  });
});

// 주문 내역을 날짜별로 그룹화
const groupedPurchases = computed(() => {
  const grouped = {};
  filteredPurchases.value.forEach(purchase => {
    const purchaseDate = new Date(purchase.purchasedAt);
    const formattedDate = purchaseDate.toISOString().slice(0, 10); // YYYY-MM-DD 형식으로 날짜만 추출
    if (!grouped[formattedDate]) {
      grouped[formattedDate] = [];
    }
    grouped[formattedDate].push(purchase);
  });
  return grouped;
});

const setCategory = (keyword) => selectedCategory.value = keyword;
const setDateRange = (range) => {
  selectedDateRange.value = range;
  selectedDate.value = null;
};

const confirmPurchase = (item) => {
  item.status = 'confirmed';
  showConfirmModal.value = false;
  itemToConfirm.value = null;
};

const toggleDelivery = (item) => item.showDelivery = !item.showDelivery;
const formatDate = (date) => date.toISOString().slice(0, 10).replace(/-/g, '.');

const openCancelModal = (item) => {
  itemToCancel.value = item;
  showModal.value = true;
};

const cancelPurchase = () => {
  if (itemToCancel.value) {
    itemToCancel.value.status = 'canceled'; // 상태 변경
    router.push(`/refund/${itemToCancel.value.id}`);
  }
  showModal.value = false;
  itemToCancel.value = null;
};

const closeModal = () => {
  showModal.value = false;
  itemToCancel.value = null;
};

const openConfirmModal = (item) => {
  itemToConfirm.value = item;
  showConfirmModal.value = true;
};

const authStore = useAuthStore();
const accessToken = authStore.accessToken;

onMounted(async () => {
  try {
    const res = await getMyOrderHistory(accessToken);
    purchases.value = res.data.orderHistories;
  } catch (err) {
    error.value = '주문 내역 불러오기 실패';
  } finally {
    loading.value = false;
  }
});

const closeConfirmModal = () => {
  showConfirmModal.value = false;
  itemToConfirm.value = null;
};
</script>

<template>
  <div class="myPurchasePage">
    <!-- 필터 영역 -->
    <div class="filter-container">
      <div class="category-buttons">
        <button :class="{ active: selectedCategory === '기념품' }" @click="setCategory('기념품')">기념품</button>
        <button :class="{ active: selectedCategory === '패키지' }" @click="setCategory('패키지')">패키지</button>
      </div>

      <div class="date-range">
        <DatePicker
          v-model="selectedDate"
          format="yyyy-MM-dd"
          language="ko"
          :min-date="dateLimit"
          :max-date="now"
          placeholder="날짜 선택"
          class="datepicker"
        />
        <div class="date-range-buttons">
          <button :class="{ active: selectedDateRange === '1month' }" @click="setDateRange('1month')">1개월</button>
          <button :class="{ active: selectedDateRange === '3month' }" @click="setDateRange('3month')">3개월</button>
          <button :class="{ active: selectedDateRange === '1year' }" @click="setDateRange('1year')">1년</button>
        </div>
      </div>
    </div>

    <!-- 결과 없음 -->
    <div v-if="filteredPurchases.length === 0" class="no-purchases">
      검색된 물품이 없습니다.
    </div>

    <!-- 구매 내역 목록 -->
    <div v-for="(orders, date) in groupedPurchases" :key="date" class="purchase-date-group">
      <h3>{{ date }}</h3>
      <div v-for="purchase in orders" :key="purchase.id" class="purchase-box">
        <div class="purchase-date">
          구매일자: {{ formatDate(purchase.purchasedAt) }}
          <div class="order-info">
            <span class="order-id">주문번호: {{ purchase.id }}</span>
            <router-link :to="'/mypage/orderhistory/Detail/' + purchase.id" class="more-link">상세조회</router-link>
          </div>
        </div>
        <div class="purchase-list">
          <div v-for="item in purchase.items" :key="item.id" class="purchase-item">
            <div class="status">{{ item.status === 'waiting' ? '구매 대기' : item.status === 'confirmed' ? '구매 확정' : '취소됨' }}</div>
            <div class="content">
              <img :src="item.image" alt="item image" />
              <div class="info">
                <h4>{{ item.name }}</h4>
                <p>{{ item.description }}</p>
                <p>수량: {{ item.quantity }}</p>
                <p>가격: {{ item.price.toLocaleString() }}원</p>
              </div>
            </div>
            <div class="actions">
              <div class="button-group">
                <button class="action-button" @click="toggleDelivery(item)">배송조회</button>
                <button class="action-button" @click="openCancelModal(item)">결제취소</button>
              </div>
              <button class="action-button" @click="openConfirmModal(item)" v-if="item.status === 'waiting'">구매 확정</button>
            </div>
            <div v-if="item.showDelivery" class="delivery">송장번호: 1234567890</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 결제 취소 모달 -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <p>정말 결제 취소하시겠습니까?</p>
        <div class="modal-buttons">
          <button @click="cancelPurchase" class="modal-confirm">결제 취소</button>
          <button @click="closeModal" class="modal-cancel">취소</button>
        </div>
      </div>
    </div>

    <!-- 구매 확정 모달 -->
    <div v-if="showConfirmModal" class="modal-overlay">
      <div class="modal-content">
        <p>정말 구매를 확정하시겠습니까?</p>
        <div class="modal-buttons">
          <button @click="confirmPurchase(itemToConfirm)" class="modal-confirm">구매 확정</button>
          <button @click="closeConfirmModal" class="modal-cancel">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.myPurchasePage {
  width: 52rem;
  margin: 0 auto;
  padding: 1rem;
}
@media (max-width: 48rem) {
  .myPurchasePage {
    width: 36rem;
  }
}
.filter-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  width: 100%;
  height: 100%;
  padding: 1rem;
}
.category-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-start;
  width: 100%;
}
.category-buttons button {
  padding: 0.3rem 0.8rem;
  border: 1px solid #ccc;
  background: #f2f2f2;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.9rem;
}
.category-buttons button.active {
  background: #333;
  color: white;
}
.date-range {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
}
.date-range-buttons {
  display: flex;
  gap: 0.5rem;
}
.date-range-buttons button {
  padding: 0.5rem 0.8rem;
  border: 1px solid #ccc;
  background: #f2f2f2;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.9rem;
}
.date-range-buttons button.active {
  background: #333;
  color: white;
}
.datepicker {
  min-width: 16rem;
}
.no-purchases {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
}
.purchase-box {
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #fafafa;
  width: 100%;
}
.purchase-date {
  font-weight: bold;
  margin-bottom: 1rem;
}
.order-info {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
.order-id {
  font-size: 1rem;
}
.more-link {
  color: #777;
  text-decoration: none;
  font-size: 1rem;
}
.more-link:hover {
  text-decoration: underline;
}
.purchase-item {
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  background: white;
  display: flex;
  flex-direction: column;
}
.status {
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.content {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.content img {
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
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.button-group {
  display: flex;
  gap: 0.5rem;
}
.action-button {
  flex: 1;
  text-align: center;
  background-color: #ffffff;
  color: black;
  padding: 0.75rem;
  border: 1px solid #000;
  border-radius: 0.375rem;
  cursor: pointer;
}
.action-button:hover {
  background-color: #5D857D;
  color: white;
}
.confirm-button, .review-button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}
.delivery {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #444;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  width: 90%;
  max-width: 24rem;
}
.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;
}

.modal-confirm, .modal-cancel {
  width: 8rem; /* Set both buttons to the same width */
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.modal-confirm {
  background-color: #5D857D;
  color: white;
}

.modal-cancel {
  background-color: #f44336;
  color: white;
}
</style>
