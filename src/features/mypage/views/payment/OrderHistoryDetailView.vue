<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import OrderHistoryDetail from '../../components/payment/OrderHistoryDetail.vue'

const purchases = ref([
  {
    id: 1,
    category: '기념품',
    purchasedAt: new Date('2025-04-01'),
    recipient: {
      name: '홍길동',
      address: '서울특별시 종로구 세종대로 175',
      phone: '010-1234-5678'
    },
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
    recipient: {
      name: '이순신',
      address: '부산광역시 해운대구 해운대로 123',
      phone: '010-9876-5432'
    },
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

const route = useRoute()
const orderId = route.params.id

const order = ref(null)
const recipient = ref(null)

onMounted(() => {
  const foundOrder = purchases.value.find(p => p.id == orderId)
  if (foundOrder) {
    // order는 recipient를 제외한 정보로
    const { recipient: r, ...rest } = foundOrder
    order.value = rest
    recipient.value = r
  }
})
</script>

<template>
  <div v-if="order && recipient">
    <h1>주문 상세</h1>
    <OrderHistoryDetail :order="order" :recipient="recipient" />
  </div>
  <div v-else>
    <p>주문을 찾을 수 없습니다.</p>
  </div>
</template>
