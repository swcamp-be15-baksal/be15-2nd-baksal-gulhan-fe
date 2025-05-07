<template>
  <div class="dashboard-nav-buttons">
    <div
      class="card"
      v-for="item in cardItems"
      :key="item.label"
      @click="navigate(item.path)"
    >
      <div class="icon-wrapper">
        <img :src="item.icon" alt="icon" />
      </div>
      <div class="label">{{ item.label }}</div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const cardItems = [
  {
    label: '배송완료',
    path: '/dashboard/delivery',
    icon: new URL('@/assets/icons/shipping-box.svg', import.meta.url).href
  },
  {
    label: '주문 수',
    path: '/dashboard/order',
    icon: new URL('@/assets/icons/order-sheet.svg', import.meta.url).href
  },
  {
    label: '운송장',
    path: '/dashboard/shipping',
    icon: new URL('@/assets/icons/shipping-bag.svg', import.meta.url).href
  }
]

const navigate = (path) => {
  router.push(path)
}
</script>

<style scoped>
.dashboard-nav-buttons {
    display: flex;
    gap: 20px;
    margin-bottom: 40px;
}

.card {
    width: 400px;
    height: 300px;
    padding: 20px;
    background-color: #f5f7f4;
    border-radius: 16px;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s ease-in-out;
}

.card:hover {
    transform: translateY(-4px);
    background-color: #f3f4f6;
}

.icon-wrapper {
    width: 100px;
    height: 100px;
    margin-bottom: 12px;
}

.icon-wrapper img {
    width: 100%;
    height: 100%;
}

.label {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
}
</style>
