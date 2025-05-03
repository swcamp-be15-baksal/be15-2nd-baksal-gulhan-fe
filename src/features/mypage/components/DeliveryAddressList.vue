<script setup>
import { ref } from 'vue';
import router from '@/router/index.js';

// 테스트용 배송지 List
const addressList = ref([
  {
    deliveryAddressId: 'address01',
    receiver : '윤채영',
    postcode : '12345',
    address : '주소주소주소주소주소1',
    detailAddress : '상세주소상세주소1',
    phone : '010-1234-5678',
    isDefault: 'Y'
  },
  {
    deliveryAddressId: 'address02',
    receiver : '차은우',
    postcode : '54321',
    address : '주소주소주소주소주소2',
    detailAddress : '상세주소상세주소2',
    phone : '010-1111-2222',
    isDefault: 'N'
  }
]);

function handleDelete(index) {
  const confirmed = confirm('정말 삭제 하시겠습니까?');
  if (confirmed) {
    // 배송지 삭제 처리하는 로직
    addressList.value.splice(index, 1);
    console.log('삭제 처리');
  }
}
</script>

<template>
  <div v-for="(item, idx) in addressList" :key="idx"
       :class="['address-box', { default: item.isDefault }]"
  >
    <div class="actions">
      <button
        @click="router.push({
            name : 'UpdateDeliveryAddress',
            params : { deliveryAddressId : item.deliveryAddressId }
          })"
      >
        <img src="@/assets/edit.svg" alt="edit" class="icon" />
      </button>
      <button @click="handleDelete(idx)">
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
</template>

<style scoped>
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
