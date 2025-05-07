<script setup>
import { useCartStore } from '@/stores/cart.js';
import { updateCartItem } from '@/features/cart/api.js';
import { deleteCartItem } from '@/features/cart/api.js';
import { computed } from 'vue';

const props = defineProps({
    item: Object,
});
const cartStore = useCartStore();

// id 기준으로 선택 여부 확인
const isSelected = computed(() =>
    cartStore.selectedItems.some((selectedItem) => selectedItem.id === props.item.id)
);

const toggleSelection = () => {
    cartStore.toggleSelection(props.item);
};

const increaseCount = async () => {
    const newCount = props.item.quantity + 1;
    try {
        await updateCartItem(props.item.cartId, newCount);
        cartStore.updateItemQuantity(props.item.id, newCount);
    } catch (err) {
        alert('수량 증가 실패');
    }
};

const decreaseCount = async () => {
    if (props.item.quantity <= 1) return;
    const newCount = props.item.quantity - 1;
    try {
        await updateCartItem(props.item.cartId, newCount);
        cartStore.updateItemQuantity(props.item.id, newCount);
    } catch (err) {
        alert('수량 감소 실패');
    }
};

const removeFromCart = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
        await deleteCartItem(props.item.cartId);
        cartStore.removeItem(props.item.id);
    } catch (err) {
        alert('삭제 실패');
    }
};
</script>

<template>
    <div class="cart-container">
        <div class="cart-item">
            <!-- 상자 내 구분선과 체크박스 배치 -->
            <div class="cart-item-header">
                <!-- 구분선 -->
                <div class="item-line"></div>

                <!-- 체크박스 -->
                <input
                    type="checkbox"
                    :checked="isSelected"
                    @change="toggleSelection"
                    class="item-checkbox" />
                <button class="cancel-btn" @click="removeFromCart">X</button>
            </div>

            <!-- 본문 내용 -->
            <div class="cart-item-body">
                <!-- 왼쪽 영역 -->
                <div class="item-left">
                    <div class="cart-item-image">
                        <img :src="item.image" alt="상품이미지" />
                    </div>
                    <div class="item-info">
                        <div class="item-type">{{ item.type }}</div>
                        <div class="item-name">{{ item.title }}</div>
                    </div>
                </div>

                <!-- 오른쪽 영역 -->
                <div class="item-right">
                    <div class="item-price">{{ item.price * item.quantity }}원</div>
                    <div class="item-controls">
                        <button
                            class="count-btn"
                            @click="decreaseCount"
                            :disabled="item.quantity <= 1">
                            -
                        </button>
                        <span>{{ item.quantity }}</span>
                        <button class="count-btn" @click="increaseCount">+</button>
                    </div>
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
.cancel-btn {
    background-color: red;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 0.25rem;
    position: absolute;
    right: 1rem;
    top: -0.8rem; /* 구분선 위로 올리기 */
    z-index: 2;
}
</style>
