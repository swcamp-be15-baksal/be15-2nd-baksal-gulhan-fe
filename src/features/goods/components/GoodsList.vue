<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import GoodsItem from '@/components/common/ItemCard.vue';
import PaginationBar from '@/components/common/PaginationBar.vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchGoodsList } from '@/features/goods/api.js';

const route = useRoute();
const router = useRouter();

const currentPage = ref(Number(route.query.page) || 1);
const itemsPerPage = 20;

const props = defineProps({
    sort: {
        type: String,
        default: '가나다순',
    },
    category: {
        type: String,
        default: '전체',
    },
    keyword: {
        type: String,
        default: '',
    },
});
function mapCategoryKey(label) {
    const map = {
        사무문구: 1,
        생활잡화: 2,
        악세서리: 3,
        디지털전자: 4,
        주방식품: 5,
    };
    return map[label] || null;
}

function mapSortKey(label) {
    const map = {
        가나다순: 'title',
        리뷰순: 'review',
        좋아요순: 'like',
        가격높은순: 'highPrice',
        가격낮은순: 'lowPrice',
    };
    return map[label] || 'title';
}

const goodsList = ref([]);
const totalPages = ref(1);

async function loadGoods() {
    try {
        const params = {
            sort: mapSortKey(props.sort),
            page: currentPage.value,
            size: itemsPerPage,
        };

        if (props.category && props.category !== '전체') {
            params.categoryFilter = mapCategoryKey(props.category);
        }

        if (props.keyword) {
            params.title = props.keyword;
        }

        const response = await fetchGoodsList(params);
        goodsList.value = response.data.data.goods;
        totalPages.value = response.data.data.pagination.totalPage;
    } catch (err) {
        console.error('기념품 목록 조회 실패:', err);
    }
}

function updatePage(page) {
    router.push({ query: { ...route.query, page: page } });
    currentPage.value = page;
    loadGoods();
}

onMounted(() => {
    loadGoods();
});

watch(
    () => [props.sort, props.category, props.keyword],
    () => {
        currentPage.value = 1;
        loadGoods();
    }
);
</script>

<template>
    <div class="goods-list-wrapper">
        <div class="grid">
            <GoodsItem
                v-for="item in goodsList"
                :key="item.goodsId"
                :data="item"
                :linkPrefix="'/goods'"
                :idKey="'goodsId'"
                :categoryKey="'goodsCategoryName'"
                :showDate="false" />
        </div>
        <PaginationBar
            :current-page="currentPage"
            :total-pages="totalPages"
            @update:page="updatePage" />
    </div>
</template>

<style scoped>
.goods-list-wrapper {
    max-width: 1040px;
    margin: 0 auto;
}

.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 52px;
}
</style>
