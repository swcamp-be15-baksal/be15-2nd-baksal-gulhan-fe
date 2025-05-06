<script setup>
const props = defineProps({
  items: Array,
});

const formatDate = (timestamp) => {
  if (!timestamp) return '';
  return timestamp.split(' ')[0] + ' ' + timestamp.split(' ')[1];
};
</script>

<template>
  <table class="comment-table">
    <thead>
    <tr>
      <th>댓글 ID</th>
      <th>내용</th>
      <th>작성일</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="comment in props.items" :key="comment.commentId">
      <td>{{ comment.commentId }}</td>
      <td>
        <RouterLink :to="`/board/${comment.travelMatePostId}`" class="board-title-link">
          {{ comment.content }}
        </RouterLink>
      </td>
      <td>{{ formatDate(comment.createdAt) }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
.comment-table {
  width: 100%;
  border-collapse: collapse;
}

.comment-table th,
.comment-table td {
  padding: 12px 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-size: 0.875rem;
}

.comment-table th {
  background-color: #f5f5f5;
  font-weight: 600;
}

.board-title-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.board-title-link:hover {
  color: #d32f2f; /* ✅ hover 시 강조 색상 */
}
</style>
