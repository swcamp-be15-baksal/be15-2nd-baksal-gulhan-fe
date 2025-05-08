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
                    :class="{ active: selectedFilter === 'MUSEUM' }"
                    @click="selectFilter('MUSEUM')">
                    박물관
                </button>
                <button
                    class="filter-button"
                    :class="{ active: selectedFilter === 'FOLK_VILLAGE' }"
                    @click="selectFilter('FOLK_VILLAGE')">
                    민속촌
                </button>
                <button
                    class="filter-button"
                    :class="{ active: selectedFilter === 'HISTORIC_SITE' }"
                    @click="selectFilter('HISTORIC_SITE')">
                    유적지
                </button>
            </div>
            <div class="d-flex" style="gap: 16px">
                <SearchBar placeholder="원하는 장소를 검색해보세요!" @search="handleSearch" />
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
                    <li v-for="parentArea in parentAreaList" :key="parentArea.areaId">
                        <a
                            :id="parentArea.areaId"
                            class="dropdown-item"
                            href="#"
                            @click.prevent="selectParentArea(parentArea)">
                            {{ parentArea.areaName }}
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
                    {{ selectedArea.areaName }}
                </button>
                <ul class="dropdown-menu">
                    <li v-if="areaList.length === 0">
                        <span class="dropdown-item text-muted">시/군/구</span>
                    </li>
                    <li v-else v-for="area in areaList" :key="area">
                        <a class="dropdown-item" href="#" @click.prevent="selectArea(area)">
                            {{ area.areaName }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SearchBar from '@/components/common/SearchBar.vue';
import { getChildArea, getParentArea } from '@/features/place/api.js';

// 필터 이벤트 emit을 위한 defineEmits
const emit = defineEmits(['filter-change', 'areaId-change', 'title-change']);

// 내부 필터 상태
const selectedFilter = ref('전체');

// 지역 드롭다운 상태
const selectedParentArea = ref('시/도');
const parentAreaList = ref([]);
const selectedArea = ref({ areaName: '시/군/구' });
const areaList = ref([]);

function handleSearch(keyword) {
    emit('title-change', keyword); // 🔥 검색어를 상위로 전달
}

function selectFilter(filter) {
    selectedFilter.value = filter;
    // 상위로 필터 변경 알림
    emit('filter-change', filter);
}

function selectAreaId(areaId) {
    console.log('selectAreaId 호출 : ', areaId);
    emit('areaId-change', areaId);
}

async function selectParentArea(parentArea) {
    console.log('??', parentArea.areaId);
    selectedParentArea.value = parentArea.areaName;
    // 2) 시/군/구 초기화
    selectedArea.value = { areaName: '시/군/구' };
    // 3) 상위에 areaId 변경(null) 알림
    emit('areaId-change', null);
    try {
        const response = await getChildArea(parentArea.areaId);
        console.log('response', response);
        areaList.value = response.data.data.areas;
    } catch (e) {}
}

function selectArea(area) {
    selectedArea.value = area;
    selectAreaId(area.areaId);
}

onMounted(async () => {
    try {
        const res = await getParentArea();
        console.log(res.data.data.areas);
        parentAreaList.value = res.data.data.areas;
    } catch (e) {}
});
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
