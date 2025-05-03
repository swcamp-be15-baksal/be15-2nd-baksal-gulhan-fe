<script setup>
defineProps({
  notices: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <table class="notice-table">
    <thead>
    <tr>
      <th>번호</th>
      <th>제목</th>
      <th>ID</th>
      <th>작성일</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="notice in notices" :key="notice.noticeId">
      <td>{{ notice.noticeId }}</td>
      <td>
        <RouterLink :to="`/notice/${notice.noticeId}`" class="notice-title-link">
          {{ notice.title }}
        </RouterLink>
      </td>
      <td>{{ notice.userId }}</td>
      <td>{{ notice.createdAt }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
.notice-table {
  width: 100%;
  border-collapse: collapse;
  border-top: 2px solid #aaa;
  table-layout: fixed;
}

.notice-table th,
.notice-table td {
  padding: 14px 10px;
  border-bottom: 1px solid #e5e5e5;
  text-align: center;
  font-size: 14px;
  word-break: break-word;
}

.notice-table th:nth-child(1),
.notice-table td:nth-child(1) {
  width: 8%;
}

.notice-table th:nth-child(2),
.notice-table td:nth-child(2) {
  width: 60%;
  text-align: center; /* ✅ 제목 가운데 정렬 */
}

.notice-table th:nth-child(3),
.notice-table td:nth-child(3) {
  width: 17%;
}

.notice-table th:nth-child(4),
.notice-table td:nth-child(4) {
  width: 15%;
}

.notice-title-link {
  color: inherit; /* ✅ 파란색 제거 */
  text-decoration: none;
  transition: color 0.2s ease;
}

.notice-title-link:hover {
  color: #d32f2f; /* ✅ hover 시 강조 색상 */
}
</style>
