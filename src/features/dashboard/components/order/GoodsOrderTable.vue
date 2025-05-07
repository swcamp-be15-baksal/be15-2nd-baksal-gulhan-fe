<script setup>
defineProps({
  items: Array
})
</script>

<template>
  <div class="package-table">
    <table>
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
.package-table {
    margin-top: 1rem;
}

.package-table table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.package-table th,
.package-table td {
    padding: 10px;
    border-bottom: 1px solid #eee;
    text-align: center;
    font-size: 0.875rem;
}

.package-table th {
    background-color: #f9f9f9;
    font-weight: 600;
}
</style>
