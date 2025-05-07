<script setup>
import { computed, ref, onMounted } from 'vue';
import CartItemList from '@/features/cart/components/CartItemList.vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart.js';
import { clearCartAPI } from '@/features/cart/api';

const router = useRouter();
const cartStore = useCartStore();
const cartItems = computed(() => cartStore.cartItems);
onMounted(() => {
    cartStore.loadCartItems();
});

const selectedItems = computed(() => cartStore.selectedItems);
const showSelectAll = ref(true);

const selectAll = computed({
    get() {
        return selectedItems.value.length === cartItems.value.length;
    },
    set(value) {
        if (value) {
            cartStore.toggleSelectAll();
        } else {
            cartStore.selectedItems = [];
        }
    },
});

const totalPrice = computed(() => {
    return cartItems.value
        .filter((item) => selectedItems.value.some((selectedItem) => selectedItem.id === item.id))
        .reduce((total, item) => total + item.price * item.quantity, 0);
});

const souvenirPrice = computed(() => {
    return cartItems.value
        .filter(
            (item) =>
                selectedItems.value.some((selectedItem) => selectedItem.id === item.id) &&
                item.type === '기념품'
        )
        .reduce((total, item) => total + item.price * item.quantity, 0);
});
const packagePrice = computed(() => {
    return cartItems.value
        .filter(
            (item) =>
                selectedItems.value.some((selectedItem) => selectedItem.id === item.id) &&
                item.type === '패키지'
        )
        .reduce((total, item) => total + item.price * item.quantity, 0);
});

const deleteAllItems = async () => {
    if (!confirm('장바구니를 비우시겠습니까?')) return;
    try {
        await clearCartAPI();
        cartStore.clearCart();
        showSelectAll.value = false;
    } catch (err) {
        alert('전체 삭제 실패');
    }
};

const priceDetails = computed(() => [
    { label: '총 금액', value: totalPrice.value },
    { label: '기념품 금액', value: souvenirPrice.value },
    { label: '패키지 금액', value: packagePrice.value },
]);

const goToPayInfo = () => {
    // priceDetails를 sessionStorage에 저장
    sessionStorage.setItem('priceDetails', JSON.stringify(priceDetails.value));
    console.log(sessionStorage.getItem('priceDetails'));
    // 결제 정보 페이지로 이동
    router.push({
        name: 'beforePayment',
    });
};
</script>

<template>
    <div class="cart-page">
        <div class="cart-content">
            <div class="cart-header">
                <h1 class="cart-title">장바구니</h1>
            </div>
            <div v-if="cartItems.length === 0" class="empty-cart-message">
                장바구니가 비어 있습니다.
            </div>
            <div class="select-all-wrapper" v-if="showSelectAll">
                <label>
                    <input type="checkbox" v-model="selectAll" />
                    전체 선택
                </label>
                <button class="delete-all-btn" @click="deleteAllItems">전체 삭제</button>
            </div>

            <CartItemList :items="cartItems" :selectedItems="selectedItems" />

            <div class="paymentInfo" v-if="selectedItems.length > 0">
                <div class="total-price">
                    <span>결제 예상 금액: </span>
                </div>
                <div class="divider"></div>
                <div class="price-details" v-for="(item, index) in priceDetails" :key="index">
                    <div class="price-left">
                        <span>{{ item.label }}</span>
                    </div>
                    <div class="price-right">
                        <span>{{ item.value }}원</span>
                    </div>
                </div>
            </div>
            <button class="complete-purchase" @click="goToPayInfo" v-if="showSelectAll">
                구매하기
            </button>
        </div>
    </div>
</template>

<style scoped>
.cart-page {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 2rem; /* 스크롤 시 위 공간 확보 */
}

.cart-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem; /* 간격을 줄임 */
    min-height: 35rem;
    min-width: 50rem;
}

.cart-header {
    display: flex;
    width: 100%;
    padding: 0 1rem;
    margin-bottom: 0.25rem;
}

.cart-title {
    font-size: 2rem;
    font-weight: bold;
}

.delete-all-btn {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: #ff4747;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.delete-all-btn:hover {
    background-color: #e63636;
}

.select-all-wrapper {
    width: 100%;
    padding: 0 1rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.paymentInfo {
    width: 100%;
    padding: 1rem;
    background-color: #ffffff;
    border: 0.0625rem solid #ddd;
    border-radius: 0.5rem;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
}

.total-price {
    font-size: 1.5rem;
    font-weight: bold;
}

.divider {
    width: 100%;
    height: 1px;
    background-color: #ccc;
    margin: 1rem 0;
}

.price-details {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 1.2rem;
}

.price-left {
    font-weight: bold;
    text-align: left;
    width: 50%;
}

.price-right {
    text-align: right;
    width: 50%;
}

.complete-purchase {
    width: 27.5rem;
    height: 3.5rem;
    background-color: #000000;
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: auto;
}
</style>
