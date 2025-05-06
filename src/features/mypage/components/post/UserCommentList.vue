<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  items: Array,
});

const router = useRouter();

const handleClick = (commentId) => {
  router.push()
  // 추후 상세 페이지 이동 구현 가능
  alert(`댓글 ID ${commentId}`);
};

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
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="comment in props.items" :key="comment.commentId">
      <td>{{ comment.commentId }}</td>
      <td>{{ comment.content }}</td>
      <td>{{ formatDate(comment.createdAt) }}</td>
      <td>
        <button class="detail-btn" @click="handleClick(comment.commentId)">
          보기
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
.comment-table {
  width: 100%;
  border-collapse: collapse;
  border-top: 2px solid #aaa;
  table-layout: fixed;
}

.comment-table th,
.comment-table td {
  padding: 14px 10px;
  border-bottom: 1px solid #e5e5e5;
  text-align: center;
  font-size: 0.875rem;
  word-break: break-word;
}

.detail-btn {
  padding: 4px 12px;
  font-size: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
  cursor: pointer;
}

.detail-btn:hover {
  background-color: #eee;
}
</style>
