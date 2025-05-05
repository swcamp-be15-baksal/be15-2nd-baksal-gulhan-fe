<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import posts from '@/features/travelmatepost/mock/tmp.json'
import TmpDetailContent from '../components/TmpDetailContent.vue'
import TmpCommentList from '../components/TmpCommentList.vue'
import TmpCommentForm from '../components/TmpCommentForm.vue'

const route = useRoute()
const router = useRouter()
const postId = Number(route.params.id)

const post = ref(null)

onMounted(() => {
  post.value = posts.find(p => p.travelMatePostId === postId)
})
</script>

<template>
  <div class="tmp-detail-page">
    <TmpDetailContent v-if="post" :post="post" />
    <TmpCommentList :postId="postId" />
    <TmpCommentForm :postId="postId" />
    <div class="button-group">
      <button class="back-btn" @click="router.push('/board')">목록으로</button>
      <button class="write-btn" @click="router.push('/board/write')">글쓰기</button>
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
