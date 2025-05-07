<script setup>
defineProps({
  userInfo: Object,
  addressList: Array,
  handleDelete: Function,
  goToAddressEdit: Function,
});
</script>

<template>
  <div
    v-for="(item, idx) in addressList"
    :key="idx"
    :class="['address-box', { default: item.defaultAddress === 'Y' }]"
  >
    <div class="actions">
      <button @click="goToAddressEdit(item.deliveryAddressId)">
        <img src="@/assets/icons/edit.svg" alt="edit" class="icon" />
      </button>
      <button @click="handleDelete(item)">
        <img src="@/assets/icons/delete.svg" alt="delete" class="icon" />
      </button>
    </div>
    <div class="info pt-3">
      <p class="receiver">
        <strong :class="{ 'gray-text': item.defaultAddress !== 'Y' }">
          {{ item.receiver }}
        </strong>
        <span v-if="item.defaultAddress === 'Y'" class="badge">기본 배송지</span>
      </p>
      <p :class="{ 'gray-text': item.defaultAddress !== 'Y' }">({{ item.zipcode }})</p>
      <p :class="{ 'gray-text': item.defaultAddress !== 'Y' }">{{ item.address }}</p>
      <p :class="{ 'gray-text': item.defaultAddress !== 'Y' }">{{ item.detailAddress }}</p>
      <p :class="{ 'gray-text': item.defaultAddress !== 'Y' }">{{ item.receiverPhone }}</p>
    </div>
  </div>
</template>

<style scoped>
.address-box {
  display: flex;
  width: 670px;
  height: 240px;
  position: relative;
  background-color: white;
  border: 1px solid #A0A0A0;
  border-radius: 10px;
  padding: 40px;
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
  margin-bottom: 15px;
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
  gap: 8px;
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
