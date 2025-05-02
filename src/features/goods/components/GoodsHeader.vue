<script setup>
import { ref } from 'vue';
import SearchBar from '@/components/common/SearchBar.vue';
function handleSearch(keyword) {
    console.log('검색어', keyword);
    // fetch(`/s1/goods/list?title={keyword}`)
}

const selectedFilter = ref('전체');

function selectFilter(filter) {
    selectedFilter.value = filter;
}
</script>

<template>
    <div style="margin-bottom: 103px">
        <div
            class="d-flex align-items-center"
            style="gap: 10px; margin-left: 33px; margin-bottom: 41px">
            <span style="font-size: 1.5rem; font-weight: 700"> 기념품 </span>
            <button class="text-white add-package-button" @click="navigate('')">
                기념품 등록하기
            </button>
        </div>
        <div class="d-flex align-items-center justify-content-between border-bottom border-black">
            <div>
                <button
                    class="filter-button"
                    :class="{ active: selectedFilter === '전체' }"
                    @click="selectFilter('전체')">
                    전체
                </button>
                <button
                    class="filter-button"
                    :class="{ active: selectedFilter === '사무문구' }"
                    @click="selectFilter('사무문구')">
                    사무문구
                </button>
                <button
                    class="filter-button"
                    :class="{ active: selectedFilter == '악세서리' }"
                    @click="selectFilter('악세서리')">
                    악세서리
                </button>
                <button
                    class="filter-button"
                    :class="{ active: selectedFilter == '디지털전자' }"
                    @click="selectFilter('디지털전자')">
                    디지털전자
                </button>
                <button
                    class="filter-button"
                    :class="{ active: selectedFilter == '주방식품' }"
                    @click="selectFilter('주방식품')">
                    주방식품
                </button>
            </div>
            <div class="d-flex" style="gap: 16px">
                <SearchBar placeholder="원하는 기념품을 검색해보세요!" @search="handleSearch" />
                <button class="sort">가나다순순</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.add-package-button {
    background-color: #3e4042;
    border-radius: 14px;
    font-size: 0.9rem;
    font-weight: 400;
    width: 117px;
    border: none;
}

.filter-button {
    border: none;
    padding: 17px 20px;
    background-color: #fffdf8;
    font-size: 1.4rem;
    font-weight: 400;
}

.filter-button.active {
    font-weight: 700;
    border-bottom: 4px solid #000000;
}

.sort {
    height: 48px;
    width: 100px;
    word-break: keep-all;
    border: 1px solid #cac4d0;
    border-radius: 10px;
    background-color: #fff;
    line-height: 1;
}
</style>
