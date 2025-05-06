<script setup>
import { ref, computed } from 'vue';
import PackageItem from '@/components/common/ItemCard.vue';
import packages from '@/features/package/mock/packages.json';
import PaginationBar from '@/components/common/PaginationBar.vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
    sort: {
        type: String,
        default: '시작일 빠른순',
    },

    area: String,
});

const emit = defineEmits(['update:area']);

function handleAreaChange(newArea) {
    emit('update:area', newArea);
}

// const sortedPackages = computed(() => {
//     if (props.sort === '좋아요순') {
//         return
//     } else if (props.sort === '리뷰순') {

//     } else {

//     }
// });
const route = useRoute();
const router = useRouter();

const currentPage = ref(Number(route.query.page) || 1);

const itemsPerPage = 20;

const totalPages = computed(() => Math.ceil(packages.length / itemsPerPage));

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return packages.slice(start, start + itemsPerPage);
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
    <div class="package-list-wrapper">
        <div class="grid">
            <PackageItem
                v-for="item in paginatedItems"
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
