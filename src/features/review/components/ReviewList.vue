<script setup>
import { ref, computed, onMounted } from 'vue';
import ReviewItem from '@/features/review/components/ReviewItem.vue';
import PaginationBar from '@/components/common/PaginationBar.vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
    reviews: {
        type: Array,
        required: true,
    },
});

const route = useRoute();
const router = useRouter();

const currentPage = ref(1);

onMounted(() => {
    const page = Number(route.query.page || 1);
    if (page < 1) {
        currentPage.value = 1;
    } else {
        currentPage.value = page;
    }
});

const itemsPerPage = 10;

const totalPages = computed(() => Math.ceil(props.reviews.length / itemsPerPage));

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return props.reviews.slice(start, start + itemsPerPage);
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
    <div class="reviews-list-wrapper">
        <ReviewItem v-for="item in paginatedItems" :key="item.reviewId" :review="item" />
        <PaginationBar
            :current-page="currentPage"
            :total-pages="totalPages"
            @update:page="updatePage" />
    </div>
</template>

<style scoped>
.reviews-list-wrapper {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin: 0 auto;
}
</style>
