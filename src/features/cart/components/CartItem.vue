<script setup>
import { useCartStore } from '@/stores/cart.js'
import { computed, ref } from 'vue'
const props = defineProps({
  item: Object
})

const cartStore = useCartStore()

const imageSrc = cartStore.imageSrc;
const isSelected = computed(() =>
  cartStore.selectedItems.some((selectedItem) => selectedItem.cartId === props.item.cartId),
)

const toggleSelection = () => {
  cartStore.toggleSelection(props.item)
}

const increaseCount = () => {
  cartStore.updateItemQuantity(props.item.cartId, props.item.quantity + 1)
}

const decreaseCount = () => {
  if (props.item.quantity > 1) {
    cartStore.updateItemQuantity(props.item.cartId, props.item.quantity - 1)
  }
}

const showModal = ref(false)

const removeFromCart = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const confirmDelete = () => {
  cartStore.removeItem(props.item.cartId)
  showModal.value = false
}
</script>

<template>
  <div class="cart-container">
    <div class="cart-item">
      <div class="cart-item-header">
        <div class="item-line"></div>
        <input
          type="checkbox"
          :checked="isSelected"
          @change="toggleSelection"
          class="item-checkbox"
        />
        <button class="cancel-btn" @click="removeFromCart">X</button>
      </div>

      <div class="cart-item-body">
        <div class="item-left">
          <div class="cart-item-image">
            <img :src="imageSrc" alt="상품이미지"/>
          </div>
          <div class="item-info">
            <div class="item-type">{{ item.targetType }}</div>
            <div class="item-name">{{ item.title }}</div>
          </div>
        </div>

        <div class="item-right">
          <div class="item-price">{{ item.price * item.quantity }}원</div>
          <div class="item-controls">
            <button class="count-btn" @click="decreaseCount" :disabled="item.quantity <= 1">-</button>
            <span>{{ item.quantity }}</span>
            <button class="count-btn" @click="increaseCount">+</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 모달 -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>이 항목을 삭제하시겠습니까?</h3>
        <div class="modal-buttons">
          <button class="delete-btn" @click="confirmDelete">삭제</button>
          <button class="cancel-btn-modal" @click="closeModal">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-container {
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 52rem;
  padding-bottom: 1.5rem;
  margin: 0 auto;
  gap: 1rem;
}

.cart-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 0.0625rem solid #ddd;
  border-radius: 0.3125rem;
  background-color: #fff;
  width: 52rem;
  height: 12rem;
  padding: 1rem;
}

.cart-item-header,
.cart-item-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 1rem;
}

.cart-item-header {
  position: relative;
  margin-bottom: 1rem;
}

.cart-item-body {
  flex-direction: row;
  margin-top: 1rem;
  padding-left: 1rem;
}

/* 구분선 */
.item-line {
  width: 100%;
  height: 0.0625rem;
  background-color: #ddd;
  position: absolute;
  top: 1rem;
  left: 0;
}

/* 체크박스 */
.item-checkbox {
  position: relative;
  z-index: 1;
}

/* 왼쪽 영역 */
.item-left {
  display: flex;
  flex: 1;
  gap: 1rem;
  min-width: 0;
}

.item-info {
  display: flex;
  flex-direction: column;
  max-width: 20rem;
  overflow: hidden;
}

.item-type {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.1875rem;
}

.item-name {
  word-break: break-word;
  font-size: 1.1rem;
  font-weight: 500;
}

/* 오른쪽 영역 */
.item-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 8rem;
}

.item-price {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 0.3125rem;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 0.3125rem;
}

.count-btn {
  background-color: #f0f0f0;
  border: 0.0625rem solid #000;
  border-radius: 0.3125rem;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

/* 이미지 영역 */
.cart-item-image {
  width: 7rem;
  height: 7rem;
  overflow: hidden;
  border-radius: 0.5rem;
}

.cart-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* X 버튼 스타일 */
.cancel-btn{
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 0.25rem;
  position: absolute;
  right: 1rem;
  top: -0.8rem;
  z-index: 2;
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  text-align: center;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.delete-btn {
  background-color: #E57575;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  color: white;
}

.cancel-btn-modal {
  background-color: black;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
</style>
