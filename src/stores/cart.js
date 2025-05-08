import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { fetchCartItemsAPI, fetchGoodsById, fetchPackageById } from '@/features/cart/api';
import { updateCartItem } from '@/features/cart/api';

export const useCartStore = defineStore('cart', () => {
    const cartItems = ref([]);
    const selectedItems = ref([]);
    // Getter: 선택된 아이템들의 총 금액 계산
    const totalPrice = computed(() => {
        return selectedItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
    });

    // Actions
    const addItem = (item) => {
        cartItems.value.push(item);
    };

    const updateItemQuantity = async (id, quantity) => {
        const item = cartItems.value.find((item) => item.id === id);
        if (item) {
            item.quantity = quantity;
            try {
                await updateCartItem(item.cartId, quantity);
            } catch (err) {
                console.error('수량 업데이트 실패:', err);
            }
        }
    };

    const removeItem = (id) => {
        cartItems.value = cartItems.value.filter((item) => item.id !== id);
        selectedItems.value = selectedItems.value.filter((item) => item.id !== id); // 선택목록에서도 제거
    };

    const clearCart = () => {
        cartItems.value = [];
        selectedItems.value = [];
    };

    const toggleSelection = (item) => {
        const index = selectedItems.value.findIndex((selected) => selected.id === item.id);
        if (index !== -1) {
            selectedItems.value.splice(index, 1);
        } else {
            selectedItems.value.push(item);
        }
    };

    const toggleSelectAll = () => {
        if (selectedItems.value.length === cartItems.value.length) {
            selectedItems.value = [];
        } else {
            selectedItems.value = [...cartItems.value];
        }
    };

    const loadCartItems = async () => {
        try {
            const res = await fetchCartItemsAPI();
            console.log('[장바구니 응답 carts]', res.data.data.carts);
            const carts = res.data.data.carts;

            const detailPromises = carts.map(async (item) => {
                const isGoods = item.targetType === 'GOODS';
                const detailRes = isGoods
                    ? await fetchGoodsById(item.targetId)
                    : await fetchPackageById(item.targetId);

                const detail = detailRes.data.data;
                console.log(detail);

                return {
                    id: item.targetId,
                    cartId: item.cartId,
                    quantity: item.quantity,
                    type: isGoods ? '기념품' : '패키지',
                    title: detail.title || detail.name,
                    price: detail.price,
                    imageUrl: detail.firstImage || null,
                };
            });

            cartItems.value = await Promise.all(detailPromises);
            selectedItems.value = [...cartItems.value];
        } catch (err) {
            console.error('장바구니 불러오기 실패:', err);
        }
    };

    return {
        cartItems,
        selectedItems,
        totalPrice,
        addItem,
        updateItemQuantity,
        removeItem,
        clearCart,
        toggleSelection,
        toggleSelectAll,
        loadCartItems,
    };
});
