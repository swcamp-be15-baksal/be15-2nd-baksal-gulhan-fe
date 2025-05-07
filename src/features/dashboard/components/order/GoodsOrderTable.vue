<script setup>
defineProps({
  items: Array
})
</script>

<template>
  <div class="table-wrapper">
    <table class="order-table">
      <thead>
      <tr>
        <th>기념품 번호</th>
        <th>기념품명</th>
        <th>주문 수량</th>
        <th>총 금액</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items" :key="item.targetId">
        <td>{{ item.targetId }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.totalQuantity }}개</td>
        <td>{{ item.totalPrice.toLocaleString() }}원</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrapper {
  overflow-x: auto;
  margin-top: 16px;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  background-color: white;
}

.order-table th,
.order-table td {
  border: 1px solid #ddd;
  padding: 12px 10px;
  text-align: center;
}

.order-table th {
  background-color: #f3f3f3;
  font-weight: bold;
}

.order-table tbody tr:hover {
  background-color: #fafafa;
}
</style>
