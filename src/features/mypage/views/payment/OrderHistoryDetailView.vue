<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import OrderHistoryDetail from '../../components/payment/OrderHistoryDetail.vue'

// 주문 데이터를 예시로 받아옵니다.
const purchases = ref([
  {
    id: 1,
    category: '기념품',
    purchasedAt: new Date('2025-04-01'),
    items: [
      {
        id: 101,
        image: 'https://d152i3f1t56z95.cloudfront.net/test/image.png',
        name: '기념품 A',
        description: '한국 전통 기념품',
        quantity: 2,
        price: 20000,
        status: 'waiting',
        showDelivery: false
      },
      {
        id: 102,
        image: 'https://d152i3f1t56z95.cloudfront.net/test/image.png',
        name: '기념품 B',
        description: '전통 부채',
        quantity: 1,
        price: 15000,
        status: 'waiting',
        showDelivery: false
      }
    ]
  },
  {
    id: 2,
    category: '패키지',
    purchasedAt: new Date('2024-12-15'),
    items: [
      {
        id: 201,
        image: 'https://d152i3f1t56z95.cloudfront.net/test/image.png',
        name: '패키지 여행 B',
        description: '제주도 3박 4일',
        quantity: 1,
        price: 1200000,
        status: 'waiting',
        showDelivery: false
      }
    ]
  }
])

// 라우터에서 전달된 주문 ID를 사용해 해당 주문을 찾습니다.
const route = useRoute()
const orderId = route.params.id

const order = ref(null)

// 해당 주문 아이템 찾기
onMounted(() => {
  const foundOrder = purchases.value.find(p => p.id == orderId)
  if (foundOrder) {
    order.value = foundOrder
  }
})
</script>

<template>
  <div v-if="order">
    <h1>주문 상세</h1>
    <OrderHistoryDetail :order="order" />
  </div>
  <div v-else>
    <p>주문을 찾을 수 없습니다.</p>
  </div>
</template>
