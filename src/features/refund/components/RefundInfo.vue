<script setup>
import { ref, computed } from 'vue';
import QuillEditor from '@/components/common/QuillEditor.vue';
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  itemId: {
    type: [String, Number],
    required: true,
  }
});

const goToRefundConfirm = () => {
  router.push(`/refund/${props.itemId}/confirm`);
};

const showModal = ref(false);

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
]);

const targetItem = computed(() => {
  return purchases.value
    .flatMap(p => p.items)
    .find(i => i.id === Number(props.itemId));
});

const refundReason = ref('');
</script>

<template>
  <div class="refund-info-container">
    <div class="refund-info" v-if="targetItem">
      <h2 class="title">환불하기</h2>

      <div class="refund-details">
        <p>1. 취소 기한은 없지만, 카드사 별로 결제 데이터 보관 기간이 달라서 1년을 초과하면 취소가 안될 수 있습니다.</p>
        <p>2. 취소는 요청 후 영업일 기준 3~4일이 소요됩니다.</p>
      </div>

      <div class="meta-info">
        <p class="purchase-date">
          {{
            new Date(purchases.find(p => p.items.some(i => i.id === targetItem.id)).purchasedAt)
              .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
              .replace(/\. /g, '.').replace('.', '')
          }}
        </p>
        <p class="order-id">(구매내역 주문 번호: {{ targetItem.id }})</p>
      </div>

      <div class="purchase-summary">
        <img :src="targetItem.image" alt="상품 이미지" class="product-image" />
        <div class="item-info">
          <p class="item-name">{{ targetItem.description }} | {{ targetItem.name }}</p>
          <p class="item-quantity">{{ targetItem.quantity }}개</p>
        </div>
        <p class="item-price">{{ targetItem.price.toLocaleString() }}원</p>
      </div>

      <div class="border-line"></div>

      <div class="refund-reason">
        <label for="refund-reason">환불 사유</label>
        <QuillEditor v-model="refundReason" />
      </div>

      <div class="submit-refund">
        <button class="refund-button" @click="showModal = true">환불 신청</button>
      </div>
    </div>

    <div v-else>
      <p>해당 상품 정보를 찾을 수 없습니다.</p>
    </div>

    <!-- ✅ 환불 확인 모달 -->
    <div class="modal-overlay" v-if="showModal">
      <div class="modal-content">
        <p class="modal-message">정말 환불하시겠습니까?</p>
        <div class="modal-buttons">
          <button class="modal-button confirm" @click="goToRefundConfirm">환불하기</button>
          <button class="modal-button cancel" @click="showModal = false">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.refund-info-container {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.refund-info {
  width: 50rem;
}

.title {
  text-align: center;
  margin-bottom: 1.5rem;
}

.border-line {
  border-top: 1px solid #ccc;
  margin: 1rem 0;
}

.refund-details {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.purchase-summary {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 1rem;
  flex-shrink: 0;
}

.item-info {
  flex-grow: 1;
}

.item-name {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.item-quantity {
  color: #666;
}

.item-price {
  font-weight: bold;
  margin-left: auto;
  padding-left: 1rem;
  white-space: nowrap;
}

.meta-info {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
  font-size: 0.95rem;
}

.purchase-date {
  font-weight: 500;
}

.order-id {
  color: #888;
}

.submit-refund {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.refund-button {
  background-color: #E57575;
  color: white;
  width: 24rem;
  height: 3.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.refund-button:hover {
  background-color: #5D857D;
}

/* ✅ 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  width: 28rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}

.modal-message {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  font-weight: 500;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.modal-button {
  flex: 1;
  height: 3rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.modal-button.confirm {
  background-color: #E57575;
  color: white;
}

.modal-button.cancel {
  background-color: #ccc;
  color: #333;
}
</style>
