<script setup>
import { ref, computed, onMounted } from 'vue';
import ReviewItem from '@/features/review/components/ReviewItem.vue';
import PaginationBar from '@/components/common/PaginationBar.vue';
import { useRoute, useRouter } from 'vue-router';
import reviews from '@/features/review/mock/reviews.json';
import packages from '@/features/package/mock/packages.json';
import goods from '@/features/goods/mock/goods.json';

import MyPageHeader from '@/features/mypage/components/common/MyPageHeader.vue';

function getTargetName(review) {
    if (review.targetType === 'PACKAGE') {
        const pkg = packages.find((p) => p.packageId === review.targetId);
        return pkg?.title || '(알 수 없는 패키지)';
    } else if (review.targetType === 'GOODS') {
        const g = goods.find((g) => g.goodsId === review.targetId);
        return g?.title || '(알 수 없는 기념품)';
    }
    return '';
}

const route = useRoute();
const router = useRouter();
const currentPage = ref(1);

//  유저 번호 수정 필요
const selectedUserNo = ref(1);

onMounted(() => {
    const page = Number(route.query.page || 1);
    currentPage.value = page < 1 ? 1 : page;
});

const filteredReviews = computed(() => {
    return reviews.filter((r) => r.userNo === selectedUserNo.value);
});

const itemsPerPage = 10;
const totalPages = computed(() => Math.ceil(filteredReviews.value.length / itemsPerPage));

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return filteredReviews.value.slice(start, start + itemsPerPage);
});

function updatePage(page) {
    router.push({
        query: { ...route.query, page: page },
    });
    currentPage.value = page;
}

const selectedFilter = ref('전체');

function selectFilter(filter) {
    selectedFilter.value = filter;
}
</script>

<template>
    <MyPageHeader />
    <div class="wrapper">
        <div class="d-flex" style="gap: 8px">
            <button
                class="filter-button"
                :class="{ active: selectedFilter === '전체' }"
                @click="selectFilter('전체')">
                전체
            </button>
            <button
                class="filter-button"
                :class="{ active: selectedFilter === '패키지' }"
                @click="selectFilter('패키지')">
                패키지
            </button>
            <button
                class="filter-button"
                :class="{ active: selectedFilter === '기념품' }"
                @click="selectFilter('기념품')">
                기념품
            </button>
        </div>
        <div class="review-list">
            <div class="d-flex review-item" v-for="item in paginatedItems" :key="item.reviewId">
                <div style="flex: 1">
                    <div class="target-name">{{ getTargetName(item) }}</div>
                    <img
                        :src="
                            goods.Img ||
                            packages.Img ||
                            'https://d152i3f1t56z95.cloudfront.net/test/image.png'
                        "
                        style="width: 200px; margin-top: 8px" />
                </div>
                <ReviewItem :showName="false" :review="item" style="flex: 4" />
            </div>
        </div>
        <PaginationBar
            :current-page="currentPage"
            :total-pages="totalPages"
            @update:page="updatePage" />
    </div>
</template>

<style scoped>
.wrapper {
    padding: 40px 200px;
}
.filter-button {
    border: none;
    border-radius: 8px;
    width: 70px;
    height: 30px;
    font-size: 1rem;
    font-weight: 400;
    color: #757575;
    background-color: #f5f5f5;
}

.filter-button.active {
    background-color: black;
    color: white;
}

.review-item {
    margin-top: 40px;
    margin-bottom: 40px;
    padding: 40px 40px;
    border: 1px solid #bdbdbd;
    gap: 32px;
}

.target-name {
    font-size: 1.2rem;
    font-weight: 700;
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
