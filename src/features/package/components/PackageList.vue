<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { fetchPackageList } from '@/features/package/api.js';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';

import PackageItem from '@/components/common/ItemCard.vue';
import PaginationBar from '@/components/common/PaginationBar.vue';

const props = defineProps({
    sort: String,
    area: Object,
    date: Object,
    keyword: String,
});

const route = useRoute();
const router = useRouter();

const currentPage = ref(Number(route.query.page) || 1);
const itemsPerPage = 20;

const packages = ref([]);
const totalPages = ref(1);

function mapSortKeyword(label) {
    switch (label) {
        case '좋아요순':
            return 'like';
        case '리뷰순':
            return 'review';
        case '시작일 빠른순':
        default:
            return null; // 기본 정렬일 때는 null 혹은 생략
    }
}

async function loadPackages() {
    const params = {
        page: currentPage.value,
        size: itemsPerPage,
    };

    const mappedSort = mapSortKeyword(props.sort);
    if (mappedSort) params.sort = mappedSort;

    if (props.area?.child && props.area.child.trim() !== '') {
        params.area = props.area.child.trim();
    } else {
        delete params.area;
    }

    if (props.date?.startDate && dayjs(props.date.startDate).isValid()) {
        params.startDate = dayjs(props.date.startDate).startOf('day').format('YYYY-MM-DD HH:mm:ss');
    }

    if (props.date?.endDate && dayjs(props.date.endDate).isValid()) {
        params.endDate = dayjs(props.date.endDate).endOf('day').format('YYYY-MM-DD HH:mm:ss');
    }

    if (props.keyword) {
        params.title = props.keyword;
    }

    try {
        const response = await fetchPackageList(params);
        const responseData = response.data;

        console.log('[loadPackages] 응답 구조 확인:', responseData);

        // 구조 안전성 체크
        if (responseData.success && responseData.data?.packages) {
            packages.value = responseData.data.packages;
            totalPages.value = responseData.data.pagination?.totalPage || 1;
        } else {
            packages.value = [];
            totalPages.value = 1;
        }
    } catch (err) {
        console.error('패키지 목록 조회 실패:', err);
        console.error('params:', params);
    }
}

// 1. 초기 로드
onMounted(() => {
    loadPackages();
});

// 2. watch로 필터 조건 바뀔 때마다 재요청
watch(
    () => [
        props.sort,
        props.area?.parent,
        props.area?.child,
        props.date?.startDate,
        props.date?.endDate,
        props.keyword,
    ],
    () => {
        currentPage.value = 1;
        loadPackages();
    }
);

// 페이지 이동 시 쿼리 반영
function updatePage(page) {
    router.push({ query: { ...route.query, page } });
    currentPage.value = page;
    loadPackages();
}
</script>

<template>
    <div class="package-list-wrapper">
        <div class="grid">
            <PackageItem
                v-for="item in packages"
                :key="item.packageId"
                :data="item"
                :linkPrefix="'/packages'"
                :idKey="'packageId'"
                :showDate="true" />
        </div>
        <PaginationBar
            :current-page="currentPage"
            :total-pages="totalPages"
            @update:page="updatePage" />
    </div>
</template>

<style scoped>
.package-list-wrapper {
    max-width: 1040px;
    margin: 0 auto;
}

.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 52px;
}
</style>
