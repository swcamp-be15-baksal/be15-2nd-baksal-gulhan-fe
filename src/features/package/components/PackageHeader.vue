<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import SearchBar from '@/components/common/SearchBar.vue';
function handleSearch(keyword) {
    console.log('검색어', keyword);
    // fetch(`/s1/packages/list?title={keyword}`)
}

const selectedFilter = ref('전체');

function selectFilter(filter) {
    selectedFilter.value = filter;
}

const router = useRouter();

const handleWritePackage = () => {
    router.push('/packages/write');
};
</script>

<template>
    <div style="margin-bottom: 103px">
        <div
            class="d-flex align-items-center"
            style="gap: 10px; margin-left: 33px; margin-bottom: 41px">
            <span style="font-size: 1.5rem; font-weight: 700"> 패키지 </span>
            <button class="text-white add-package-button" @click="handleWritePackage">
                패키지 등록하기
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
                    :class="{ active: selectedFilter === '지역' }"
                    @click="selectFilter('지역')">
                    지역 선택하기
                </button>
                <button
                    class="filter-button"
                    :class="{ active: selectedFilter == '날짜' }"
                    @click="selectFilter('날짜')">
                    날짜 선택하기
                </button>
            </div>
            <div class="d-flex" style="gap: 16px">
                <SearchBar placeholder="원하는 패키지를 검색해보세요!" @search="handleSearch" />
                <button class="sort">시작일 빠른순</button>
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
    padding: 17px 46px;
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
