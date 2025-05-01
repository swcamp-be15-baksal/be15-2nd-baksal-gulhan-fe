<script setup>
import NoticeTable from '../components/NoticeTable.vue'
import SearchBar from '../components/SearchBar.vue'
import PagingBar from '../components/PagingBar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const goToWrite = () => {
  router.push('/notice/write')
}
</script>

<template>
  <div class="container">
    <div class="notice-header">
      <h2>공지사항</h2>
      <SearchBar />
    </div>
    <NoticeTable />
    <div class="notice-footer">
      <div class="pagination-wrapper">
        <PagingBar />
      </div>
      <button class="btn-write" @click="goToWrite">글쓰기</button>
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
}
</style>

