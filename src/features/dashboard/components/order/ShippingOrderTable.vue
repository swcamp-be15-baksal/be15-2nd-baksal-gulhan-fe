<script setup>
import { computed } from 'vue';

const props = defineProps({
  orders: Array,
});

const formattedOrders = computed(() =>
  props.orders.map((order) => ({
    ...order,
    orderedAt: order.orderedAt.split('T')[0],
  }))
);
</script>

<template>
  <table class="order-table">
    <thead>
    <tr>
      <th>주문 ID</th>
      <th>주문일</th>
      <th>총금액</th>
      <th>총적립금</th>
      <th>총수량</th>
      <th>운송장번호</th>
      <th>주소</th>
      <th>수령인</th>
      <th>전화번호</th>
      <th>주문코드</th>
      <th>회원번호</th>
      <th>회원이름</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="order in formattedOrders" :key="order.orderId">
      <td>{{ order.orderId }}</td>
      <td>{{ order.orderedAt }}</td>
      <td>{{ order.totalPrice.toLocaleString() }}원</td>
      <td>{{ order.totalPoint }}</td>
      <td>{{ order.totalAmount }}</td>
      <td>{{ order.shippingNo || '미입력' }}</td>
      <td>{{ order.address }}</td>
      <td>{{ order.receiver }}</td>
      <td>{{ order.receiverPhone }}</td>
      <td>{{ order.orderCode }}</td>
      <td>{{ order.userNo }}</td>
      <td>{{ order.userName }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
.order-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.order-table th,
.order-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.order-table th {
  background-color: #f5f5f5;
}
</style>
