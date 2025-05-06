<script setup>
const props =defineProps({
  items: Array,
})
</script>

<template>
  <table class="post-table">
    <thead>
    <tr>
      <th>동행글 ID</th>
      <th>제목</th>
      <th>작성일</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="post in props.items" :key="post.travelMatePostId">
      <td>{{ post.travelMatePostId }}</td>
      <td>
      <RouterLink :to="`/board/${post.travelMatePostId}`" class="post-title-link">
        {{ post.title }}
      </RouterLink>
      </td>
      <td>{{ post.createdAt }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
.post-table {
  width: 100%;
  border-collapse: collapse;
}

.post-table th,
.post-table td {
  padding: 12px 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-size: 0.875rem;
}

.post-table th {
  background-color: #f5f5f5;
  font-weight: 600;
}

.post-title-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.post-title-link:hover {
  color: #d32f2f; /* ✅ hover 시 강조 색상 */
}
</style>
