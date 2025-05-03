<script setup>
import { ref, computed } from 'vue'
import TmpTable from '../components/TmpTable.vue'
import PaginationBar from '@/components/common/PaginationBar.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import postsData from '@/features/travelmatepost/mock/tmp.json'

const posts = ref(postsData)
const currentPage = ref(1)
const pageSize = 10

const totalPages = computed(() =>
  Math.ceil(posts.value.length / pageSize)
)

const pagedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return posts.value.slice(start, start + pageSize)
})

function updatePage(page) {
  currentPage.value = page
}

function handleSearch(keyword) {
  console.log('검색어:', keyword)
  // 나중에 검색 기능 붙일 때 여기에 구현
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

    <TmpTable :posts="pagedPosts" />

    <div class="footer">
      <div class="pagination-wrapper">
        <PaginationBar
          :current-page="currentPage"
          :total-pages="totalPages"
          @update:page="updatePage"
        />
      </div>
      <RouterLink to="/travelpost/write" class="btn-write">글쓰기</RouterLink>
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
