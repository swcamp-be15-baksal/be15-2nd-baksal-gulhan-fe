<script setup>
import { ref, computed } from 'vue';
import GoodsItem from '@/components/common/ItemCard.vue';
import goods from '@/features/goods/mock/goods.json';
import PaginationBar from '@/components/common/PaginationBar.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const currentPage = ref(Number(route.query.page) || 1);

const itemsPerPage = 20;

const totalPages = computed(() => Math.ceil(goods.length / itemsPerPage));

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return goods.slice(start, start + itemsPerPage);
});

function updatePage(page) {
    router.push({
        query: { ...route.query, page: page },
    });
    currentPage.value = page;
}

// 여기 pagination 로직 나중에 싹 다 수정해야 됨
</script>

<template>
    <div class="goods-list-wrapper">
        <div class="grid">
            <GoodsItem
                v-for="item in paginatedItems"
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
