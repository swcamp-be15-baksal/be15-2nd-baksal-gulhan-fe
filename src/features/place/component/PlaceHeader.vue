<script setup>
import { computed, ref } from 'vue';
import SearchBar from '@/components/common/SearchBar.vue';

function handleSearch(keyword) {
  console.log('검색어', keyword);
  // fetch(`/s1/packages/list?title={keyword}`)
}

const selectedFilter = ref('전체');

// 선택된 시/도
const selectedParentArea = ref('시/도')

// 시/도 목록
const parentAreaList = ['서울특별시', '경기도']

// 시/도에 따른 시/군/구 데이터
const areaData = {
    '서울특별시': ['동작구', '관악구', '중구', '강남구', '서초구'],
    '경기도': ['수원시', '성남시', '고양시', '용인시']
}

// 선택된 시/군/구 (초기값)
const selectedArea = ref('시/군/구')

// 선택된 시/도에 해당하는 시/군/구 목록
const areaList = computed(() => {
    return areaData[selectedParentArea.value] || []
})

function selectFilter(filter) {
  selectedFilter.value = filter;
}

function selectParentArea(parentArea) {
    selectedParentArea.value = parentArea
    selectedArea.value = '시/군/구' // 시/도 바꾸면 시/군/구 초기화
}

function selectArea(area) {
    selectedArea.value = area
}
</script>

<template>
  <div style="margin-bottom: 59px">
    <div
      class="d-flex align-items-center"
      style="gap: 10px; margin-left: 33px; margin-bottom: 41px">
      <span style="font-size: 1.5rem; font-weight: 700"> 관람정보 </span>
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
          :class="{ active: selectedFilter === '박물관' }"
          @click="selectFilter('박물관')">
          박물관
        </button>
        <button
          class="filter-button"
          :class="{ active: selectedFilter === '민속촌' }"
          @click="selectFilter('민속촌')">
          유적지
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
    <div class="dropdown">
      <!-- 시/도 드롭다운 -->
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          {{ selectedParentArea }}
      </button>
        <ul class="dropdown-menu">
          <li v-for="parentArea in parentAreaList" :key="parentArea">
            <a class="dropdown-item" href="#" @click.prevent="selectParentArea(parentArea)">{{ parentArea }}</a>
          </li>
        </ul>

      <!-- 시/군/구 드롭다운 -->
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
</template>

<style scoped>

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
.dropdown button {
    width: 160px;
    height: 44px;
    color: black;
    background-color: #FFFDF8;
    border: none;
    font-size: 1.406em;
}
.btn-secondary {
    --bs-btn-border-color: none;
    --bs-btn-hover-color: black;
    --bs-btn-hover-bg: #FFFDF8;
    --bs-btn-hover-border-color: none;
    --bs-btn-focus-shadow-rgb: none;
    --bs-btn-active-color: black;
    --bs-btn-active-bg: #FFFDF8;
    --bs-btn-active-border-color: none;
    --bs-btn-active-shadow: none;
    --bs-btn-disabled-color: black;
    --bs-btn-disabled-bg: #FFFDF8;
    --bs-btn-disabled-border-color: #FFFDF8;
}
</style>
