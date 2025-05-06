<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

import PaginationBar from '@/components/common/PaginationBar.vue';
import { useToast } from 'vue-toastification';
import { fetchUserBoard } from '@/features/mypage/api.js';

const toast = useToast();
const authStore = useAuthStore();
const posts = ref([]);
const currentPage = ref(1);
const pageSize = 10;

const totalPages = computed(() =>
  Math.ceil(posts.value.length / pageSize)
);

const pagedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return posts.value.slice(start, start + pageSize);
});

const fetchPostData = async () => {
  try {
    const res = await fetchUserBoard(authStore.accessToken);
    posts.value = res.data.boardList;
  } catch (e) {
    toast.error('내 게시글 조회에 실패했습니다.',e);
  }
};

onMounted(fetchPostData);
</script>

<template>
  <div class="user-post-list">
    <table class="table">
      <thead>
      <tr>
        <th>번호</th>
        <th>제목</th>
        <th>작성일</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(post, index) in pagedPosts" :key="post.travelMatePostId">
        <td>{{ index + 1 + (currentPage - 1) * pageSize }}</td>
        <td>{{ post.title }}</td>
        <td>{{ post.createdAt }}</td>
      </tr>
      <tr v-if="posts.length === 0">
        <td colspan="3" class="text-center">작성한 게시글이 없습니다.</td>
      </tr>
      </tbody>
    </table>

    <PaginationBar
      :current-page="currentPage"
      :total-pages="totalPages"
      @update:page="(page) => (currentPage = page)"
    />
  </div>
</template>

<style scoped>
.user-post-list {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #ddd;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

th, td {
  border-bottom: 1px solid #eee;
  padding: 10px;
  text-align: center;
}
</style>
