<script setup>
import { computed, ref } from 'vue'
import ShippingEdit from '@/features/dashboard/components/order/ShippingEdit.vue'
import { updateShippingOrder } from '@/features/dashboard/api/dashboard.js'
import { useAuthStore } from '@/stores/auth.js'
import SearchBar from '@/components/common/SearchBar.vue' // ← 공통 컴포넌트 import

const props = defineProps({
  orders: Array,
})

const authStore = useAuthStore()
const accessToken = authStore.accessToken
const editingOrderId = ref(null)
const searchKeyword = ref('')
const showOnlyNullShipping = ref(false)

const handleSearch = (keyword) => {
  searchKeyword.value = keyword.trim()
}

const toggleEdit = async (order) => {
  if (editingOrderId.value === order.orderId) {
    try {
      await updateShippingOrder(order.orderId, {
        shippingNo: order.shippingNo,
        receiver: order.receiver,
        receiverPhone: order.receiverPhone,
        address: order.address,
      }, accessToken)
      editingOrderId.value = null
    } catch (e) {
      alert('수정 실패',e)
    }
  } else {
    editingOrderId.value = order.orderId
  }
}

const formattedOrders = computed(() =>
  props.orders
    .map(order => ({
      ...order,
      orderedAt: order.orderedAt.split('T')[0],
    }))
    .filter(order =>
      order.userId.includes(searchKeyword.value) ||
      order.userName.includes(searchKeyword.value) ||
      order.receiver.includes(searchKeyword.value) ||
      order.orderedAt.includes(searchKeyword.value) ||
      order.orderCode.includes(searchKeyword.value)
    )
    .filter(order =>
      !showOnlyNullShipping.value || !order.shippingNo
    )
)
</script>

<template>
  <div class="filter-container">
    <label class="checkbox">
      <input type="checkbox" v-model="showOnlyNullShipping" />
      운송장번호 없음만 보기
    </label>
    <SearchBar placeholder="주문일, 회원ID, 수령인, 주문코드 검색" @search="handleSearch"/>
  </div>

  <table class="shipping-table">
    <thead>
    <tr>
      <th>주문일</th>
      <th>주문 코드</th>
      <th>회원 아이디</th>
      <th>회원 이름</th>
      <th>총 수량</th>
      <th>총 금액</th>
      <th>총 적립금</th>
      <th>운송장 번호</th>
      <th>수령인</th>
      <th>전화번호</th>
      <th>주소</th>
      <th>수정</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="order in formattedOrders" :key="order.orderId">
      <td>{{ order.orderedAt }}</td>
      <td>{{ order.orderCode }}</td>
      <td>{{ order.userId }}</td>
      <td>{{ order.userName }}</td>
      <td>{{ order.totalAmount }}</td>
      <td>{{ order.totalPrice.toLocaleString() }}원</td>
      <td>{{ order.totalPoint }}</td>

      <td>
        <input v-if="editingOrderId === order.orderId" v-model="order.shippingNo" type="text" />
        <span v-else>{{ order.shippingNo }}</span>
      </td>
      <td>
        <input v-if="editingOrderId === order.orderId" v-model="order.receiver" type="text" />
        <span v-else>{{ order.receiver }}</span>
      </td>
      <td>
        <input v-if="editingOrderId === order.orderId" v-model="order.receiverPhone" type="text" />
        <span v-else>{{ order.receiverPhone }}</span>
      </td>
      <td>
        <input v-if="editingOrderId === order.orderId" v-model="order.address" type="text" />
        <span v-else>{{ order.address }}</span>
      </td>

      <td>
        <ShippingEdit @click="() => toggleEdit(order)" />
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
.shipping-table {
  margin-top: 1rem;
  width: 100%;
}

.shipping-table th,
.shipping-table td {
  padding: 10px;
  border-bottom: 1px solid #eee;
  text-align: center;
  font-size: 0.7rem;
  max-width: 170px;
}

.shipping-table th {
  background-color: #f9f9f9;
  font-weight: 600;
}

.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.checkbox {
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  gap: 6px;
}
</style>
