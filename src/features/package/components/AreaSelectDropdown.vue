<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
const emit = defineEmits(['update:area']);

const selectedParentArea = ref('시/도');
const selectedArea = ref('시/군/구');

const parentAreaList = ['서울특별시', '경기도'];
const areaData = {
    서울특별시: ['동작구', '관악구', '중구', '강남구', '서초구'],
    경기도: ['수원시', '성남시', '고양시', '용인시'],
};

const areaList = computed(() => {
    return areaData[selectedParentArea.value] || [];
});

function selectParentArea(area) {
    selectedParentArea.value = area;
    selectedArea.value = '시/군/구';
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
                <li v-for="parentArea in parentAreaList" :key="parentArea">
                    <a class="dropdown-item" href="#" @click.prevent="selectParentArea(parentArea)">
                        {{ parentArea }}
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
    background-color: #fffdf8;
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
