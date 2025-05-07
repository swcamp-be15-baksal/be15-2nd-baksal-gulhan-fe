<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import PaginationBar from '@/components/common/PaginationBar.vue';
import { useRoute, useRouter } from 'vue-router';
import ItemCard from '@/components/common/ItemCard.vue';
import FilterHeader from '@/features/mypage/components/common/FilterHeader.vue';
import MyPageHeader from '@/features/mypage/components/common/MyPageHeader.vue';

import likes from '@/features/mypage/mock/likes.json';
import packages from '@/features/package/mock/packages.json';
import goods from '@/features/goods/mock/goods.json';

const route = useRoute();
const router = useRouter();

const currentPage = ref(1);
const itemsPerPage = 20;
const selectedUserNo = ref(1);
const selectedFilter = ref('전체'); // 필터 초기화

// 관심 패키지/기념품 ID 추출
const likedPackageIds = computed(() =>
    likes
        .filter((l) => l.user_id === selectedUserNo.value && l.target_type === 'PACKAGE')
        .map((l) => l.target_id)
);

const likedGoodsIds = computed(() =>
    likes
        .filter((l) => l.user_id === selectedUserNo.value && l.target_type === 'GOODS')
        .map((l) => l.target_id)
);

// 전체 관심 아이템 목록
const allLikedItems = computed(() => {
    return likes
        .filter((l) => l.user_id === selectedUserNo.value)
        .sort((a, b) => b.like_id - a.like_id) // ⬅️ like_id 기준 정렬
        .map((l) => {
            if (l.target_type === 'PACKAGE') {
                return packages.find((p) => p.packageId === l.target_id);
            } else if (l.target_type === 'GOODS') {
                return goods.find((g) => g.goodsId === l.target_id);
            }
            return null;
        })
        .filter((item) => item !== null); // 존재하지 않는 데이터 제거
});

// 필터링된 관심 아이템 목록
const filteredItems = computed(() => {
    if (selectedFilter.value === '전체') return allLikedItems.value;
    if (selectedFilter.value === '패키지')
        return packages.filter((p) => likedPackageIds.value.includes(p.packageId));
    if (selectedFilter.value === '기념품')
        return goods.filter((g) => likedGoodsIds.value.includes(g.goodsId));
    return [];
});

// 페이지네이션 계산
const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage));
const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return filteredItems.value.slice(start, start + itemsPerPage);
});

// 페이지 변경 처리
function updatePage(page) {
    router.push({ query: { ...route.query, page } });
    currentPage.value = page;
}

// URL에서 페이지 초기화
onMounted(() => {
    const page = Number(route.query.page || 1);
    currentPage.value = page < 1 ? 1 : page;
});

// 필터 바뀔 때 페이지 리셋
watch(selectedFilter, () => {
    currentPage.value = 1;
});
</script>

<template>
    <MyPageHeader />
    <div class="wrapper">
        <FilterHeader @update:filter="selectedFilter = $event" />
        <div class="grid">
            <ItemCard
                v-for="item in paginatedItems"
                :key="item.packageId || item.goodsId"
                :data="item"
                :idKey="item.packageId ? 'packageId' : 'goodsId'"
                :linkPrefix="item.packageId ? '/packages' : '/goods'"
                :categoryKey="item.packageId ? 'area' : 'goodsCategoryName'"
                :showDate="!!item.startDate" />
        </div>
        <PaginationBar
            :current-page="currentPage"
            :total-pages="totalPages"
            @update:page="updatePage" />
    </div>
</template>

<style scoped>
.wrapper {
    max-width: 1040px;
    margin: 0 auto;
}
.grid {
    margin-top: 52px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 52px;
}
</style>
