<script setup>
import { ref, computed, watch } from 'vue';
import { fetchAreas } from '@/features/package/area-api.js';

const emit = defineEmits(['update:area']);

const selectedParentArea = ref('시/도');
const selectedArea = ref('시/군/구');

const parentAreaList = ref([
    { name: '서울', id: 1 },
    { name: '인천', id: 2 },
    { name: '대전', id: 3 },
    { name: '대구', id: 4 },
    { name: '광주', id: 5 },
    { name: '부산', id: 6 },
    { name: '울산', id: 7 },
    { name: '세종특별자치시', id: 8 },
    { name: '경기도', id: 9 },
    { name: '강원특별자치도', id: 10 },
    { name: '충청북도', id: 11 },
    { name: '충청남도', id: 12 },
    { name: '경상북도', id: 13 },
    { name: '경상남도', id: 14 },
    { name: '전북특별자치도', id: 15 },
    { name: '전라남도', id: 16 },
]);
const areaData = ref([]);
const areaList = computed(() => areaData.value.map((area) => area.areaName));

async function selectParentArea(areaObj) {
    selectedParentArea.value = areaObj.name;

    try {
        const res = await fetchAreas(areaObj.id);

        areaData.value = res.data.data.areas;

        if (areaData.value.length > 0) {
            selectedArea.value = areaData.value[0].areaName;
            emit('update:area', {
                parent: selectedParentArea.value,
                child: selectedArea.value,
            });
        } else {
            selectedArea.value = '시/군/구';
        }
    } catch (err) {
        console.error('[지역 목록 불러오기 실패]', err);
        areaData.value = [];
        selectedArea.value = '시/군/구';
    }
}

function selectArea(area) {
    selectedArea.value = area;
    emit('update:area', { parent: selectedParentArea.value, child: area });
}
</script>

<template>
    <div class="d-flex" style="gap: 12px; height: 68px">
        <!-- 시/도 -->
        <div class="dropdown">
            <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown">
                {{ selectedParentArea }}
            </button>
            <ul class="dropdown-menu">
                <li v-for="parentArea in parentAreaList" :key="parentArea.id">
                    <a class="dropdown-item" href="#" @click.prevent="selectParentArea(parentArea)">
                        {{ parentArea.name }}
                    </a>
                </li>
            </ul>
        </div>

        <!-- 시/군/구 -->
        <div class="dropdown">
            <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown">
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
.dropdown {
    border: none;
    background-color: #fff;
    font-size: 1.4rem;
    font-weight: 400;
    padding: 17px 24px;
    white-space: nowrap;
    border-bottom: 4px solid transparent;
    display: flex;
    align-items: center;
    text-align: center;
}

.dropdown-toggle {
    border: none;
    background-color: transparent;
    color: black;
    font-size: 1.4rem !important;
    box-shadow: none !important;
}

.dropdown-toggle:focus,
.dropdown-toggle:active,
.dropdown-toggle:hover {
    background-color: transparent !important;
    color: black !important;
    box-shadow: none !important;
}
</style>
