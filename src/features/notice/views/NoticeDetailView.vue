<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'

const route = useRoute()
const router = useRouter()
const noticeId = Number(route.params.id)

import { noticeMap } from '@/features/notice/noticeDummy.js'
const noticeMaps = noticeMap

const notice = computed(() => noticeMaps[noticeId])
const goBack = () => router.push('/notice')

const showMenu = ref(false)
const toggleMenu = () => {
  showMenu.value = !showMenu.value
  console.log(showMenu.value)
}

const goToEdit = () => {
  router.push(`/notice/edit/${noticeId}`)
}

const deleteNotice = async (id) => {
  alert(`예시 데이터에서 noticeId ${id} 삭제됨 (실제 삭제 아님)`)
}

const onDelete = async () => {
  try {
    await deleteNotice(noticeId)
    router.push('/notice')
  } catch (error) {
    console.error('삭제 실패:', error)
    alert('삭제 중 오류 발생')
  }
}
</script>

<template>
  <div class="notice-detail">
    <div class="notice-breadcrumb">
      <RouterLink to="/notice" class="back-link">공지사항 &gt;</RouterLink>
    </div>

    <div class="notice-box">
      <div class="notice-header">
        <div class="badge">공지</div>
        <h3>{{ notice.title }}</h3>
        <!-- 문제 많은 수정 삭제 버튼;;; -->
        <div class="menu-wrapper">
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
      <RouterLink to="/notice/write" class="btn red">글쓰기</RouterLink>
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
  font-size: 16px;
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
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
}
.menu-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
}

.menu-wrapper {
  position: relative;
  margin-left: auto;
  z-index: 20;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 32px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.dropdown-menu button {
  display: block;
  width: 100%;
  padding: 8px 16px;
  border: none;
  background: white;
  cursor: pointer;
  text-align: left;
}

.dropdown-menu button:hover {
  background-color: #f5f5f5;
}

.notice-meta {
  color: #777;
  font-size: 14px;
  margin-bottom: 24px;
  display: flex;
  gap: 20px;
}

.notice-content {
  font-size: 15px;
  line-height: 1.6;
  white-space: pre-wrap;
}

.notice-buttons {
  align-items: center;
  display: flex;
  justify-content: space-between;
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
