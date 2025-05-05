<script setup>
import { ref, onMounted } from 'vue'
import NoticeList from '../components/NoticeList.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import PaginationBar from '@/components/common/PaginationBar.vue'
import { fetchNoticeList } from '@/features/notice/api/notice.js'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const notices = ref([])
const pagination = ref({ currentPage: 1, totalPage: 1, size: 20 })
const currentPage = ref(1)
const searchKeyword = ref('')

const getNotices = async () => {
  try {
    const params = {
      title: searchKeyword.value || null,
      page: currentPage.value,
      size: pagination.value.size,
    }
    const data = await fetchNoticeList(params)
    notices.value = data.tmpList
    pagination.value = data.pagination
  } catch (error) {
    console.error('공지사항 목록 조회 실패:', error)
  }
}

onMounted(getNotices)

const updatePage = (page) => {
  currentPage.value = page
  getNotices()
}

const handleSearch = (keyword) => {
  searchKeyword.value = keyword
  currentPage.value = 1
  getNotices()
}

// 관리자 여부 확인하는 코드 ( 잘 모르겠음.. )
const isAdmin = authStore.userRank === 1
</script>

<template>
  <div class="container">
    <div class="notice-header">
      <h2>공지사항</h2>
      <SearchBar placeholder="검색어를 입력하세요." @search="handleSearch" />
    </div>

    <NoticeList :notices="notices" />

    <div class="notice-footer">
      <div class="pagination-wrapper">
        <PaginationBar
          :current-page="pagination.currentPage"
          :total-pages="pagination.totalPage"
          @update:page="updatePage"
        />
      </div>

      <!-- 관리자일 경우만 노출 -->
      <RouterLink
        v-if="isAdmin"
        to="/notice/write"
        class="btn-write"
      >
        글쓰기
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  padding: 20px 60px;
  box-sizing: border-box;
}

.notice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.notice-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.pagination-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
}

.btn-write {
  padding: 8px 16px;
  font-weight: bold;
  border: 1px solid #aaa;
  background-color: white;
  border-radius: 6px;
  cursor: pointer;
  color: #333;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-write:hover {
  background-color: #f2f2f2;
  border-color: #888;
}
</style>
