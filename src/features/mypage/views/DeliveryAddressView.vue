<script setup>
// 테스트용 배송지 List
import { ref } from 'vue';
import router from '@/router/index.js';

const addressList = ref([
  {
    receiver : '윤채영',
    address : '주소주소주소주소주소1'
    , detailAddress : '상세주소상세주소1',
    phone : '010-1234-5678',
    isDefault: true
  },
  {
    receiver : '차은우',
    address : '주소주소주소주소주소2',
    detailAddress : '상세주소상세주소2',
    phone : '010-1111-2222',
    isDefault: false
  }
]);

function handleDelete() {
  const confirmed = confirm('정말 삭제 하시겠습니까?');
  if (confirmed) {
    // 배송지 삭제 처리하는 로직
    console.log('삭제 처리');
  }
}
</script>

<template>
  <div class="container">
    <h2 class="title">배송지 관리</h2>

    <div v-for="(item, idx) in addressList" :key="idx"
         :class="['address-box', { default: item.isDefault }]"
    >
      <div class="actions">
        <button @click="router.push(`/mypage/deliveryaddress/edit`)">
          <img src="@/assets/edit.svg" alt="edit" class="icon" />
        </button>
        <button @click="handleDelete">
          <img src="@/assets/delete.svg" alt="delete" class="icon" />
        </button>
      </div>
      <div class="info">
        <p class="receiver">
          <strong :class="{ 'gray-text': !item.isDefault }">{{ item.receiver }}</strong>
          <span v-if="item.isDefault" class="badge">기본 배송지</span>
        </p>
        <p :class="{ 'gray-text': !item.isDefault }">{{ item.address }}</p>
        <p :class="{ 'gray-text': !item.isDefault }">{{ item.detailAddress }}</p>
        <p :class="{ 'gray-text': !item.isDefault }">{{ item.phone }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  justify-items: center;
}

.title {
  font-size: 1.75rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
}

.address-box {
  display: flex;
  width: 670px;
  height: 225px;
  position: relative;
  background-color: white;
  border: 1px solid #A0A0A0;
  border-radius: 10px;
  padding: 50px;
  margin-bottom: 30px;
  align-items: center;
}
.address-box.default {
  border-color: #75A9FF;
}

.receiver {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.5rem;
  margin-bottom: 25px;
}

.badge {
  font-size: 0.75rem;
  color: #75A9FF;
  border: 1px solid #75A9FF;
  border-radius: 10px;
  margin-left: 8px;
}

.gray-text {
  color: #A0A0A0;
}

.actions {
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: start;
}

.icon {
  width: 30px;
  height: 30px;
}
.actions button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
</style>
