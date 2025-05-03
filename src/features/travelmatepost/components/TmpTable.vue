<script setup>
defineProps({
  posts: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <table class="tmp-table">
    <thead>
    <tr>
      <th>번호</th>
      <th>제목</th>
      <th>작성자</th>
      <th>작성일</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="post in posts" :key="post.travelMatePostId">
      <td>{{ post.travelMatePostId }}</td>
      <td>
        <RouterLink :to="`/travelpost/${post.travelMatePostId}`" class="title-link">
          {{ post.title }}
        </RouterLink>
      </td>
      <td>{{ post.userId }}</td>
      <td>{{ post.createdAt }}</td>
      <td>
        <button class="ellipsis">⋯</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
.tmp-table {
  width: 100%;
  border-collapse: collapse;
  border-top: 2px solid #aaa;
  table-layout: fixed;
}

.tmp-table th,
.tmp-table td {
  padding: 14px 10px;
  border-bottom: 1px solid #e5e5e5;
  text-align: center;
  font-size: 0.875rem;
  word-break: break-word;
}

.tmp-table th:nth-child(1),
.tmp-table td:nth-child(1) {
  width: 8%;
}
.tmp-table th:nth-child(2),
.tmp-table td:nth-child(2) {
  text-align: center; /* 제목 가운데 정렬 */
}
.tmp-table th:nth-child(3),
.tmp-table td:nth-child(3) {
  width: 20%;
}
.tmp-table th:nth-child(4),
.tmp-table td:nth-child(4) {
  width: 15%;
}
.tmp-table th:nth-child(5),
.tmp-table td:nth-child(5) {
  width: 5%;
}

.title-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.title-link:hover {
  color: #d32f2f;
}

.ellipsis {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}
</style>
