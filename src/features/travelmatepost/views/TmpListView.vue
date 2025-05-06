<script setup>
import { ref, onMounted } from 'vue'
import TmpTable from '../components/TmpTable.vue'
import PaginationBar from '@/components/common/PaginationBar.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import { fetchTmpList } from '@/features/travelmatepost/api/travelmatepost.js'

const posts = ref([])
const pagination = ref({ currentPage: 1, totalPage: 1, size: 20 })
const currentPage = ref(1)
const searchKeyword = ref('')

const getPosts = async () => {
  try {
    const params = {
      title: searchKeyword.value || null,
      page: currentPage.value,
      size: pagination.value.size
    }
    const data = await fetchTmpList(params)
    posts.value = data.tmpList
    pagination.value = data.pagination
  } catch (error) {
    console.error('동행글 목록 조회 실패:', error)
  }
}

onMounted(getPosts)

const updatePage = (page) => {
  currentPage.value = page
  getPosts()
}

const handleSearch = (keyword) => {
  searchKeyword.value = keyword
  currentPage.value = 1
  getPosts()
}
</script>

<template>
  <div class="container">
    <div class="header">
      <div>
        <h2 class="title">동행 모집 게시판</h2>
        <p class="desc">문화유산 따라 걷는 여행길, 마음 맞는 동행과 함께하세요!</p>
      </div>
      <SearchBar placeholder="검색어를 입력하세요." @search="handleSearch" />
    </div>

    <TmpTable :posts="posts" />

    <div class="footer">
      <div class="pagination-wrapper">
        <PaginationBar
          :current-page="pagination.currentPage"
          :total-pages="pagination.totalPage"
          @update:page="updatePage"
        />
      </div>
      <RouterLink to="/board/write" class="btn-write">글쓰기</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  padding: 20px 60px;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
}

.title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 4px;
}

.desc {
  font-size: 0.875rem;
  color: #666;
}

.footer {
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
