<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue';
import { fetchNoticeDetail, deleteNotice } from '@/features/notice/api/notice'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const noticeId = Number(route.params.id)
const authStore = useAuthStore()
const showMenu = ref(false)
const notice = ref(null)

onMounted(async () => {
  try {
    const res = await fetchNoticeDetail(noticeId)
    notice.value = res.noticeDTO
  } catch (e) {
    alert('공지사항 상세 조회 실패',e)
  }
})

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const goToEdit = () => {
  router.push(`/notice/edit/${noticeId}`)
}

const onDelete = async () => {
  if (!confirm('정말 삭제하시겠습니까?')) return
  try {
    await deleteNotice(noticeId, authStore.accessToken)
    alert('삭제되었습니다.')
    await router.push('/notice')
  } catch (e) {
    alert('삭제 실패',e)
  }
}

const goBack = () => router.push('/notice')
const goToWrite = () => router.push('/notice/write')

const isAdmin = authStore.userRank === 'SLAVE'
</script>

<template>
  <div class="notice-detail" v-if="notice">
    <div class="notice-breadcrumb">
      <RouterLink to="/notice" class="back-link">공지사항 &gt;</RouterLink>
    </div>

    <div class="notice-box">
      <div class="notice-header">
        <div class="badge">공지</div>
        <h3>{{ notice.title }}</h3>

        <!-- 관리자만 메뉴 노출 -->
        <div class="menu-wrapper" v-if="isAdmin">
          <button @click="toggleMenu" class="menu-btn">⋯</button>
          <div v-show="showMenu" class="dropdown-menu">
            <button @click="goToEdit">수정</button>
            <button @click="onDelete">삭제</button>
          </div>
        </div>
      </div>

      <div class="notice-meta">
        <span>{{ notice.userId }}</span>
        <span>{{ notice.createdAt }}</span>
      </div>

      <hr />

      <div class="notice-content" v-html="notice.content" />
    </div>

    <div class="notice-buttons">
      <button @click="goBack" class="btn">목록으로</button>

      <!-- 관리자만 글쓰기 노출 -->
      <button v-if="isAdmin" @click="goToWrite" class="btn red">글쓰기</button>
    </div>
  </div>
</template>

<style scoped>
.notice-detail {
  width: 100%;
  padding: 40px 100px;
  box-sizing: border-box;
  background-color: #fffef9;
}

.notice-breadcrumb {
  margin-bottom: 12px;
}

.back-link {
  text-decoration: none;
  font-size: 1rem;
  color: #333;
}

.notice-box {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 30px;
  background-color: white;
}

.notice-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.badge {
  background-color: #333;
  color: white;
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 4px;
}

.menu-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 4px;
}

.menu-wrapper {
  position: relative;
  margin-left: auto;
}

.menu-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
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
}

.dropdown-menu button {
  padding: 8px 12px;
  font-size: 0.875rem;
  border: none;
  background: white;
  cursor: pointer;
  text-align: center;
}

.dropdown-menu button:hover {
  background-color: #f5f5f5;
}

.notice-meta {
  color: #777;
  font-size: 0.875rem;
  margin-bottom: 24px;
  display: flex;
  gap: 20px;
}

.notice-content {
  font-size: 1rem;
  line-height: 1.6;
  white-space: pre-wrap;
}

.notice-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 30px;
}

.btn {
  padding: 10px 16px;
  border: 1px solid #aaa;
  background: white;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  color: black;
}

.red {
  color: #d32f2f;
  border-color: #d32f2f;
}
</style>
