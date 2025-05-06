<script setup>
defineProps({
  items: Array,
  isComment: Boolean
})
</script>

<template>
  <table class="post-table">
    <thead>
    <tr>
      <th>번호</th>
      <th>{{ isComment ? '내용' : '제목' }}</th>
      <th>작성일</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in items" :key="item.commentId || item.travelMatePostId">
      <td>{{ item.commentId || item.travelMatePostId }}</td>
      <td>
        <RouterLink
          :to="{ name: 'board-detail', params: { id: item.travelMatePostId } }"
          class="link"
        >
          {{ isComment ? item.content : item.title }}
        </RouterLink>
      </td>
      <td>{{ item.createdAt }}</td>
      <td>⋯</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
.post-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 0.95rem;
}

.post-table th,
.post-table td {
  border-bottom: 1px solid #ccc;
  padding: 12px;
  text-align: center;
}

.post-table th {
  background: #f9f9f9;
}

.link {
  color: #333;
  text-decoration: none;
}
.link:hover {
  text-decoration: underline;
}
</style>
