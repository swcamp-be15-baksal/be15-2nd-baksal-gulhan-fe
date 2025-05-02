<script setup>
import { ref, computed } from 'vue'
import NoticeList from '../components/NoticeList.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import PaginationBar from '@/components/common/PaginationBar.vue'
import noticeData from '@/features/notice/mock/notice.json'

const notices = ref([])
const currentPage = ref(1)
const pageSize = 20

notices.value = noticeData

const totalPages = computed(() =>
    Math.ceil(notices.value.length / pageSize)
)

const pagedNotices = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return notices.value.slice(start, start + pageSize)
})

function updatePage(page) {
    currentPage.value = page
}

function handleSearch(keyword) {
    console.log('검색어 : ', keyword);
    // fetch(`/s2/notice/list?title={keyword}`)
}
</script>

<template>
    <div class="container">
        <div class="notice-header">
            <h2>공지사항</h2>
            <SearchBar placeholder="검색어를 입력하세요." @search="handleSearch"/>
        </div>

        <NoticeList :notices="pagedNotices" />

        <div class="notice-footer">
            <div class="pagination-wrapper">
                <PaginationBar
                    :current-page="currentPage"
                    :total-pages="totalPages"
                    @update:page="updatePage"
                />
            </div>
            <RouterLink to="/notice/write" class="btn-write">글쓰기</RouterLink>
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
