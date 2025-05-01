<script setup>
import { ref, computed } from 'vue';
import PackageItem from '@/features/package/components/PackageItem.vue';
import packages from '@/features/package/mock/packages.json';

const itemsPerPage = 20;
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(packages.length / itemsPerPage));

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return packages.slice(start, start + itemsPerPage);
});

function goToPage(page) {
    currentPage.value = page;
}
// 여기 pagination 로직 나중에 싹 다 수정해야 됨
</script>

<template>
    <div class="package-list-wrapper">
        <div class="grid">
            <PackageItem v-for="item in paginatedItems" :key="item.packageId" :packages="item" />
        </div>

        <div class="pagination">
            <button
                v-for="page in totalPages"
                :key="page"
                @click="goToPage(page)"
                :class="{ active: currentPage === page }">
                {{ page }}
            </button>
        </div>
    </div>
</template>

<style scoped>
.package-list-wrapper {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2열 */
    gap: 32px;
}

.pagination {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    gap: 8px;
}

.pagination button {
    padding: 6px 12px;
    border: none;
    background: #eee;
    cursor: pointer;
    border-radius: 4px;
    font-weight: 500;
}

.pagination button.active {
    background: #ff268f;
    color: white;
    font-weight: 700;
}
</style>
