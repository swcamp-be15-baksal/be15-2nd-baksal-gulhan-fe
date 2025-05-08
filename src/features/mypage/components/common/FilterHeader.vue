<script setup>
import { ref } from 'vue';
const selectedFilter = ref('전체');
const emit = defineEmits(['update:filter']);

function selectFilter(filter) {
    selectedFilter.value = filter;
    emit('update:filter', filter);
}
</script>

<template>
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
        <button
          class="filter-button"
          :class="{ active: selectedFilter === '장소' }"
          @click="selectFilter('장소')">
          장소
        </button>
    </div>
</template>

<style scoped>
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
</style>
