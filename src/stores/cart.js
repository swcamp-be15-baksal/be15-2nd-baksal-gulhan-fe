import {defineStore} from 'pinia';
import { ref } from 'vue';
import { getCarts } from '@/features/cart/api/cart.js';
import { useAuthStore } from '@/stores/auth.js';
export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([]);
  const authStore = useAuthStore();
  const fetchCartItems = async () => {
    try {
      const response = await getCarts(authStore.accessToken)
      cartItems.value = response.data.data.carts
    } catch (error) {
      console.error('장바구니 불러오기 실패:', error)
    }
  }
  const imageSrc = 'https://placehold.co/555x416';

  const selectedItems = ref([])

  const addItem = (item) => {
    cartItems.value.push(item)
  }

  const updateItemQuantity = (id, quantity) => {
    const item = cartItems.value.find((item) => item.id === id)
    if (item) item.quantity = quantity
  }

  const removeItem = (cartId) => {
    cartItems.value = cartItems.value.filter((item) => item.cartId !== cartId)
    selectedItems.value = selectedItems.value.filter((item) => item.cartId !== cartId) // 선택목록에서도 제거
  }

  const clearCart = () => {
    cartItems.value = []
    selectedItems.value = []
  }

  const toggleSelection = (item) => {
    const index = selectedItems.value.findIndex(selected => selected.cartId === item.cartId)
    if (index !== -1) {
      selectedItems.value.splice(index, 1)
    } else {
      selectedItems.value.push(item)
    }
  }

  const toggleSelectAll = () => {
    if (selectedItems.value.length === cartItems.value.length) {
      selectedItems.value = []
    } else {
      selectedItems.value = [...cartItems.value]
    }
  }

  return {
    cartItems,
    selectedItems,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    toggleSelection,
    toggleSelectAll,
    fetchCartItems,
    imageSrc
  }
})
