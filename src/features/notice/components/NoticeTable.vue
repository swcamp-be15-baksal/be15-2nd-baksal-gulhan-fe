<script setup>
import { ref, onMounted } from 'vue'
import { getNoticeList } from '@/features/notice/api.js';

const notices = ref([])

onMounted(async () => {
  const response = await getNoticeList()
  notices.value = response.data.data
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
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="notice in notices" :key="notice.noticeId">
      <td>{{ notice.noticeId }}</td>
      <td>{{ notice.title }}</td>
      <td>{{ notice.userId }}</td>
      <td>{{ notice.createdAt }}</td>
      <td>⋯</td>
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
  margin: 0 auto;
}

.notice-table th,
.notice-table td {
  padding: 14px 10px;
  border-bottom: 1px solid #e5e5e5;
  text-align: center;
  font-size: 14px;
  word-break: break-word;
}

/* 열 너비 비율 조정 */
.notice-table th:nth-child(1),
.notice-table td:nth-child(1) {
  width: 8%;
}

.notice-table th:nth-child(2),
.notice-table td:nth-child(2) {
  width: 60%;
}

.notice-table th:nth-child(3),
.notice-table td:nth-child(3) {
  width: 17%;
}

.notice-table th:nth-child(4),
.notice-table td:nth-child(4) {
  width: 15%;
}
</style>

