<script setup>
import { computed } from 'vue';

const props = defineProps({
    totalPages: { type: Number, required: true },
    currentPage: { type: Number, required: true },
});

const emit = defineEmits(['update:page']);

function goToPage(page) {
    if (page === '...') return;
    emit('update:page', page);
}

const visiblePages = computed(() => {
    const total = props.totalPages;
    const current = props.currentPage;
    const pages = [];

    if (total <= 7) {
        for (let i = 1; i <= total; i++) pages.push(i);
    } else {
        if (current <= 3) {
            pages.push(1, 2, 3, '...', total - 1, total);
        } else if (current >= total - 2) {
            pages.push(1, 2, '...', total - 2, total - 1, total);
        } else {
            pages.push(1, '...', current - 1, current, current + 1, '...', total);
        }
    }
    return pages;
});
</script>

<template>
    <div class="pagination">
        <button
            style="width: 78px"
            :disabled="props.currentPage === 1"
            @click="goToPage(props.currentPage - 1)">
            ← 이전
        </button>

        <button
            v-for="page in visiblePages"
            :key="page"
            @click="goToPage(page)"
            :class="{ active: props.currentPage === page }"
            :disabled="page === '...'">
            {{ page }}
        </button>

        <button
            style="width: 78px"
            :disabled="props.currentPage === props.totalPages"
            @click="goToPage(props.currentPage + 1)">
            다음 →
        </button>
    </div>
</template>

<style scoped>
.pagination {
    margin-top: 72px;
    display: flex;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
}

.pagination button {
    background: none;
    border: none;
    font-size: 0.9rem;
    cursor: pointer;
    width: 32px;
    height: 32px;
    padding: 4px 12px;
    border-radius: 8px;
    color: #2c2c2c;
    text-align: center;
}

.pagination button.active {
    background: #2c2c2c;
    color: white;
}

.pagination button:disabled {
    color: #757575;
    cursor: default;
}
</style>
