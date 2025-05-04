import {defineStore} from 'pinia';
import mockData from '@/features/cart/mock/items.json'
export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: mockData.items,
    selectedItemIds: [],
  }),
  getters: {
    // 선택된 아이템들의 총 금액 계산
    totalPrice: (state) => {
      return state.cartItems
        .filter((item) => state.selectedItemIds.includes(item.id)) // 선택된 아이템들만 필터링
        .reduce((total, item) => total + item.price * item.quantity, 0); // 선택된 아이템들의 금액 합산
    },
  },
  actions: {
    addItem(item) {
      this.cartItems.push(item);
    },
    updateItemQuantity(id, quantity) {
      const item = this.cartItems.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeItem(id) {
      this.cartItems = this.cartItems.filter((item) => item.id !== id);
    },
    clearCart() {
      this.cartItems = [];
    },
    toggleSelection(id) {
      if (this.selectedItemIds.includes(id)) {
        this.selectedItemIds = this.selectedItemIds.filter(itemId => itemId !== id);
      } else {
        this.selectedItemIds.push(id);
      }
    },
    toggleSelectAll() {
      if (this.selectedItemIds.length === this.cartItems.length) {
        // 이미 모든 아이템이 선택된 경우, 선택 해제
        this.selectedItemIds = [];
      } else {
        // 모든 아이템 선택
        this.selectedItemIds = this.cartItems.map(item => item.id);
      }
    },
  },
});
