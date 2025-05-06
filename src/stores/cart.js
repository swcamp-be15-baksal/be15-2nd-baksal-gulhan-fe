import {defineStore} from 'pinia';
import mockData from '@/features/cart/mock/items.json'
import { computed, ref } from 'vue';
export const useCartStore = defineStore('cart', () => {
  const cartItems = ref(mockData.items)
  const selectedItems = ref([])
  // Getter: 선택된 아이템들의 총 금액 계산
  const totalPrice = computed(() => {
    return selectedItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
  })

  // Actions
  const addItem = (item) => {
    cartItems.value.push(item)
  }

  const updateItemQuantity = (id, quantity) => {
    const item = cartItems.value.find((item) => item.id === id)
    if (item) item.quantity = quantity
  }

  const removeItem = (id) => {
    cartItems.value = cartItems.value.filter((item) => item.id !== id)
    selectedItems.value = selectedItems.value.filter((item) => item.id !== id) // 선택목록에서도 제거
  }

  const clearCart = () => {
    cartItems.value = []
    selectedItems.value = []
  }

  const toggleSelection = (item) => {
    const index = selectedItems.value.findIndex(selected => selected.id === item.id)
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
    totalPrice,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    toggleSelection,
    toggleSelectAll
  }
})
