<template>
  <div class="detail-container">
    <div class="breadcrumb">
      <RouterLink to="/board">동행글 게시판</RouterLink> &gt;
    </div>

    <div class="post-box">
      <div class="post-header">
        <h2 class="post-title">{{ post.title }}</h2>

        <div class="menu-container">
          <button class="menu-btn" @click="toggleMenu">⋯</button>
          <div v-show="menuVisible" class="dropdown-menu">
            <button @click="onEdit">수정</button>
            <button @click="onDelete">삭제</button>
          </div>
        </div>
      </div>

      <div class="post-info">
        <span class="author">{{ post.userId }}</span>
        <span class="date">{{ post.createdAt }}</span>
      </div> <hr>

      <div class="post-content">
        <p>{{ post.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import posts from '@/features/travelmatepost/mock/tmp.json'

const route = useRoute()
const router = useRouter()
const postId = Number(route.params.id)
const post = ref({})
const menuVisible = ref(false)

onMounted(() => {
  const data = posts.find(p => p.travelMatePostId === postId)
  if (data) post.value = data
})

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value
}

const onEdit = () => {
  router.push(`/board/edit/${postId}`)
}

const onDelete = () => {
  if (confirm('정말 삭제하시겠습니까?')) {
    alert('삭제 완료 (실제 삭제는 아님)')
    router.push('/board')
  }
}
</script>

<style scoped>
.post-box {
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 6px;
  background-color: white;
}

.breadcrumb {
  font-size: 1rem;
  margin-bottom: 16px;
  color: #444;
}

.breadcrumb a {
  text-decoration: none;
  color: #333;
}

.post-box {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 24px;
  position: relative;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.menu-container {
  position: relative;
}

.menu-btn {
  font-size: 1.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 28px;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  z-index: 100;
  min-width: 100px;
}

.dropdown-menu button {
  padding: 4px 1px;
  font-size: 0.875rem;
  border: none;
  background: white;
  cursor: pointer;
  text-align: center;
}
.dropdown-menu button:hover {
  background-color: #f5f5f5;
}

.post-info {
  display: flex;
  gap: 12px;
  font-size: 0.875rem;
  color: #777;
  margin: 12px 0;
}

.post-content {
  font-size: 1rem;
  line-height: 1.6;
  white-space: pre-wrap;
}
</style>
