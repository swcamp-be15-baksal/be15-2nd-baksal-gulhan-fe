<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  items: Array,
});
</script>

<template>
  <div class="order-table">
    <table>
      <thead>
      <tr>
        <th>패키지 ID</th>
        <th>패키지명</th>
        <th>주문 수량</th>
        <th>총 결제 금액</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in props.items" :key="item.targetId">
        <td>{{ item.targetId }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.totalQuantity }}</td>
        <td>{{ item.totalPrice.toLocaleString() }}원</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.order-table {
  margin-top: 1rem;
}

.order-table table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.order-table th,
.order-table td {
  padding: 10px;
  border-bottom: 1px solid #eee;
  text-align: center;
  font-size: 0.875rem;
}

.order-table th {
  background-color: #f9f9f9;
  font-weight: 600;
}
</style>
