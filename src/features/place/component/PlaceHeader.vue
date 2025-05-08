<template>
    <div style="padding: 60px 60px">
        <div
            class="d-flex align-items-center"
            style="gap: 10px; margin-left: 80px; margin-bottom: 41px">
            <span style="font-size: 2rem; font-weight: 700">관람정보</span>
        </div>
        <div class="d-flex align-items-center justify-content-between border-bottom border-black">
            <div>
                <!-- 필터 버튼들 -->
                <button
                    class="filter-button"
                    :class="{ active: selectedFilter === '전체' }"
                    @click="selectFilter('전체')">
                    전체
                </button>
                <button
                    class="filter-button"
                    :class="{ active: selectedFilter === '박물관' }"
                    @click="selectFilter('박물관')">
                    박물관
                </button>
                <button
                    class="filter-button"
                    :class="{ active: selectedFilter === '민속촌' }"
                    @click="selectFilter('민속촌')">
                    민속촌
                </button>
                <button
                    class="filter-button"
                    :class="{ active: selectedFilter === '유적지' }"
                    @click="selectFilter('유적지')">
                    유적지
                </button>
            </div>
            <div class="d-flex" style="gap: 16px">
                <SearchBar placeholder="원하는 장소를 검색해보세요!" @search="handleSearch" />
                <button class="sort">시작일 빠른순</button>
            </div>
        </div>
        <div class="d-flex align-items-center gap-2" style="margin-top: 20px">
            <!-- 지역 드롭다운은 그대로 유지 -->
            <div class="dropdown">
                <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {{ selectedParentArea }}
                </button>
                <ul class="dropdown-menu">
                    <li v-for="parentArea in parentAreaList" :key="parentArea">
                        <a
                            class="dropdown-item"
                            href="#"
                            @click.prevent="selectParentArea(parentArea)">
                            {{ parentArea }}
                        </a>
                    </li>
                </ul>
            </div>
            <div class="dropdown">
                <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {{ selectedArea }}
                </button>
                <ul class="dropdown-menu">
                    <li v-if="areaList.length === 0">
                        <span class="dropdown-item text-muted">시/군/구</span>
                    </li>
                    <li v-else v-for="area in areaList" :key="area">
                        <a class="dropdown-item" href="#" @click.prevent="selectArea(area)">
                            {{ area }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import SearchBar from '@/components/common/SearchBar.vue';

// 필터 이벤트 emit을 위한 defineEmits
const emit = defineEmits(['filter-change']);

// 내부 필터 상태
const selectedFilter = ref('전체');

// 지역 드롭다운 상태
const selectedParentArea = ref('시/도');
const parentAreaList = ['서울특별시', '경기도'];
const selectedArea = ref('시/군/구');
const areaData = {
    서울특별시: ['동작구', '관악구', '중구', '강남구', '서초구'],
    경기도: ['수원시', '성남시', '고양시', '용인시'],
};
const areaList = computed(() => areaData[selectedParentArea.value] || []);

function handleSearch(keyword) {
    console.log('검색어', keyword);
}

function selectFilter(filter) {
    selectedFilter.value = filter;
    // 상위로 필터 변경 알림
    emit('filter-change', filter);
}

function selectParentArea(parentArea) {
    selectedParentArea.value = parentArea;
    selectedArea.value = '시/군/구';
}

function selectArea(area) {
    selectedArea.value = area;
}
</script>

<style scoped>
.filter-button {
    border: none;
    padding: 17px 46px;
    background-color: #fff;
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
.dropdown button {
    width: 160px;
    height: 44px;
    color: black;
    background-color: #fff;
    border: none;
    font-size: 1.406em;
}
.btn-secondary {
    --bs-btn-border-color: none;
    --bs-btn-hover-color: black;
    --bs-btn-hover-bg: #fffdf8;
    --bs-btn-hover-border-color: none;
    --bs-btn-focus-shadow-rgb: none;
    --bs-btn-active-color: black;
    --bs-btn-active-bg: #fffdf8;
    --bs-btn-active-border-color: none;
    --bs-btn-active-shadow: none;
    --bs-btn-disabled-color: black;
    --bs-btn-disabled-bg: #fffdf8;
    --bs-btn-disabled-border-color: #fffdf8;
}
</style>
