<script setup>
import { ref, computed } from 'vue';
import posts from '@/features/travelmatepost/mock/tmp.json';
import comments from '@/features/travelmatepost/mock/comment.json';
import { useUserStore } from '@/features/mypage/stores/user';
import UserPostTable from '@/features/mypage/components/UserPostTable.vue';
import PaginationBar from '@/components/common/PaginationBar.vue';
import MyPageHeader from '@/features/mypage/components/MyPageHeader.vue';

const tab = ref('post');
const currentPage = ref(1);
const pageSize = 2;

const userStore = useUserStore();
const userId = userStore.userId;

const postItems = computed(() => posts.filter((p) => p.userId === userId));
const commentItems = computed(() => comments.filter((c) => c.userId === userId));

const displayedItems = computed(() => {
    return tab.value === 'post' ? postItems.value : commentItems.value;
});

const pagedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return displayedItems.value.slice(start, start + pageSize);
});

const totalPages = computed(() => Math.ceil(displayedItems.value.length / pageSize));

const changeTab = (type) => {
    tab.value = type;
    currentPage.value = 1; // 탭 바꿀 때 페이지 초기화
};
</script>

<template>
    <MyPageHeader />
    <div class="user-post-view">
        <h2>{{ tab === 'post' ? '내가 쓴 동행글' : '내가 쓴 댓글' }}</h2>

        <div class="tab-buttons">
            <button :class="{ active: tab === 'post' }" @click="changeTab('post')">게시글</button>
            <button :class="{ active: tab === 'comment' }" @click="changeTab('comment')">
                댓글
            </button>
        </div>

        <UserPostTable :items="pagedItems" :isComment="tab === 'comment'" />

        <PaginationBar
            :current-page="currentPage"
            :total-pages="totalPages"
            @update:page="(page) => (currentPage = page)" />
    </div>
</template>

<style scoped>
.user-post-view {
    padding: 40px 80px;
    background: #fdfbf5;
}

h2 {
    text-align: center;
    margin-bottom: 24px;
}

.tab-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-bottom: 10px;
}

.tab-buttons button {
    padding: 6px 14px;
    font-size: 0.875rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    background-color: #eee;
    color: #555;
}

.tab-buttons .active {
    background-color: #333;
    color: white;
}
</style>
