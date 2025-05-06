<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { fetchTmpDetail } from '@/features/travelmatepost/api/travelmatepost.js'
import TmpDetailContent from '../components/TmpDetailContent.vue'
import TmpCommentList from '../components/TmpCommentList.vue'
import TmpCommentForm from '../components/TmpCommentForm.vue'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const postId = Number(route.params.id)

const post = ref(null)
const commentListRef = ref(null)

onMounted(async () => {
  try {
    const res = await fetchTmpDetail(postId)
    post.value = res.tmpDetailDTO
  } catch (err) {
    console.error('게시글 상세 조회 실패:', err)
  }
})

const isMyPost = computed(() => {
  return post.value && authStore.userId === post.value.userId
})
</script>

<template>
  <div class="tmp-detail-page">
    <TmpDetailContent v-if="post" :post="post" :is-my-post="isMyPost" />
    <TmpCommentList ref="commentListRef" :post-id="postId" />
    <TmpCommentForm :post-id="postId" @submit="commentListRef.fetchCommentData()" />
    <div class="button-group">
      <button class="back-btn" @click="router.push('/board')">목록으로</button>
      <RouterLink v-if="authStore.isAuthenticated" to="/board/write" class="write-btn">글쓰기</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.tmp-detail-page {
  padding: 32px 80px;
  background: #fefcf7;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 40px;
}

.back-btn, .write-btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.875rem;
  cursor: pointer;
  border: 1px solid #d66;
  transition: all 0.2s ease;
}

.back-btn {
  background-color: #333;
  color: white;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.write-btn {
  background-color: white;
  color: #d66;
}

.write-btn:hover {
  background-color: #fef0f0;
}
</style>
