<script setup>
import { ref, computed } from 'vue'
import DatePicker from 'vue3-datepicker'

// 현재 날짜
const now = new Date()

// 선택한 날짜와 범위
const selectedDate = ref(null)
const selectedCategory = ref('기념품')
const selectedDateRange = ref('1month')

// 구매 데이터 예시
const purchases = ref([
  {
    id: 1,
    category: '기념품',
    purchasedAt: new Date('2025-04-01'),
    items: [
      {
        id: 101,
        image: 'https://d152i3f1t56z95.cloudfront.net/test/image.png',
        name: '기념품 A',
        description: '한국 전통 기념품',
        quantity: 2,
        price: 20000,
        status: 'waiting',
        showDelivery: false
      },
      {
        id: 102,
        image: 'https://d152i3f1t56z95.cloudfront.net/test/image.png',
        name: '기념품 B',
        description: '전통 부채',
        quantity: 1,
        price: 15000,
        status: 'waiting',
        showDelivery: false
      }
    ]
  },
  {
    id: 2,
    category: '패키지',
    purchasedAt: new Date('2024-12-15'),
    items: [
      {
        id: 201,
        image: 'https://d152i3f1t56z95.cloudfront.net/test/image.png',
        name: '패키지 여행 B',
        description: '제주도 3박 4일',
        quantity: 1,
        price: 1200000,
        status: 'waiting',
        showDelivery: false
      }
    ]
  }
])

// 날짜 범위 계산
const dateLimit = computed(() => {
  const limit = new Date(now)
  if (selectedDateRange.value === '1month') limit.setMonth(now.getMonth() - 1)
  else if (selectedDateRange.value === '3month') limit.setMonth(now.getMonth() - 3)
  else if (selectedDateRange.value === '1year') limit.setFullYear(now.getFullYear() - 1)
  return limit
})

// 날짜가 선택되었을 때 정확히 해당 날짜를 비교하는 함수
const isValidDate = (purchaseDate, selectedDate) => {
  if (!selectedDate) return true
  const selectedDateObj = selectedDate instanceof Date ? selectedDate : new Date(selectedDate)
  // 날짜만 비교 (시간 제외)
  return purchaseDate.toISOString().slice(0, 10) === selectedDateObj.toISOString().slice(0, 10)
}
// 선택한 날짜와 범위에 맞는 구매 데이터 필터링
const filteredPurchases = computed(() =>
  purchases.value.filter(p => {
    const purchaseDate = new Date(p.purchasedAt)
    const isDateValid = isValidDate(purchaseDate, selectedDate.value)
    return p.category === selectedCategory.value && isDateValid && purchaseDate >= dateLimit.value
  })
)

// 범위 설정 함수
const setCategory = (cat) => (selectedCategory.value = cat)
const setDateRange = (range) => {
  selectedDateRange.value = range
  // 날짜 범위가 변경되면 선택된 날짜도 초기화
  selectedDate.value = null
}

const confirmPurchase = (item) => (item.status = 'confirmed')
const toggleDelivery = (item) => (item.showDelivery = !item.showDelivery)
</script>

<template>
  <div class="myPurchasePage">
    <div class="filter-container">
      <div class="category-buttons">
        <button
          :class="{ active: selectedCategory === '기념품' }"
          @click="setCategory('기념품')"
        >기념품</button>
        <button
          :class="{ active: selectedCategory === '패키지' }"
          @click="setCategory('패키지')"
        >패키지</button>
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

    <div v-if="filteredPurchases.length === 0" class="no-purchases">
      검색된 물품이 없습니다.
    </div>

    <div v-for="purchase in filteredPurchases" :key="purchase.id" class="purchase-box">
      <div class="purchase-date">
        구매일자: {{ purchase.purchasedAt.toISOString().slice(0, 10).replace(/-/g, '.') }}
        <div class="order-info">
          <span class="order-id">주문번호: {{ purchase.id }}</span>
          <router-link :to="'/mypage/orderhistory/Detail/' + purchase.id" class="more-link">더보기</router-link>
        </div>
      </div>
      <div class="purchase-list">
        <div v-for="item in purchase.items" :key="item.id" class="purchase-item">
          <div class="status">{{ item.status === 'waiting' ? '구매 대기' : '구매 확정' }}</div>
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
            <button class="action-button" @click="toggleDelivery(item)">배송조회</button>
            <router-link :to="'/refund/' + item.id" class="action-button-link">
              결제취소
            </router-link>
          </div>

          <button v-if="item.status === 'waiting'" @click="confirmPurchase(item)" class="confirm-button">구매 확정</button>
          <button v-if="item.status === 'confirmed'" class="review-button">리뷰 쓰기</button>
          <div v-if="item.showDelivery" class="delivery">송장번호: 1234567890</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.myPurchasePage {
  width: 52rem; /* 기본 너비 52rem */
  margin: 0 auto;
  padding: 1rem;
}

@media (max-width: 48rem) {
  .myPurchasePage {
    width: 36rem; /* 화면이 좁을 때 너비 36rem */
  }
}

.filter-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬로 수정 */
  gap: 1.5rem;
  width: 100%;
  height: 100%;
  padding: 1rem;
}

.category-buttons {
  display: flex;
  gap: 0.5rem; /* 버튼 간격 줄이기 */
  justify-content: flex-start;
  width: 100%;
}

.category-buttons button {
  padding: 0.3rem 0.8rem; /* 버튼 크기 줄이기 */
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
  gap: 0.5rem; /* 날짜 선택기와 범위 버튼 간격 줄이기 */
  align-items: center;
  width: 100%;
}

.date-range-buttons {
  display: flex;
  gap: 0.5rem; /* 범위 버튼 간격 줄이기 */
}

.date-range-buttons button {
  padding: 0.5rem 0.8rem; /* 버튼 크기 줄이기 */
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
  min-width: 16rem; /* 달력 크기 조정 */
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
  color: #007bff;
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
  justify-content: space-between;
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
  gap: 0.5rem;
}

.action-button,
.action-button-link {
  flex: 1;
  text-align: center;
  background-color: #ffffff;
  color: black;
  padding: 0.75rem;
  border: 1px solid #000000;
  border-radius: 0.375rem;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
}

.action-button-link:hover,
.action-button:hover {
  background-color: #218838;
}


.delivery {
  margin-top: 0.5rem;
  color: #007bff;
}

.confirm-button {
  width: 100%;
  background-color: #000;
  color: white;
  padding: 1rem;
  border: none;
  cursor: pointer;
  border-radius: 0.375rem;
  margin-top: 1rem;
}

.confirm-button:hover {
  background-color: #333;
}

.review-button {
  width: 100%;
  background-color: #28a745;
  color: white;
  padding: 1rem;
  border: none;
  cursor: pointer;
  border-radius: 0.375rem;
  margin-top: 1rem;
}

.review-button:hover {
  background-color: #218838;
}
</style>
