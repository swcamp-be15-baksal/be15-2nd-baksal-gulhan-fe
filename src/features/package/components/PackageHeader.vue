<script setup>
import { useRouter } from 'vue-router';
import SortDropdown from '@/features/package/components/SortDropdown.vue';
import { ref } from 'vue';
import SearchBar from '@/components/common/SearchBar.vue';
import AreaSelectDropdown from '@/features/package/components/AreaSelectDropdown.vue';
import DateSelectDropdown from '@/features/package/components/DateSelectDropdown.vue';

const props = defineProps({
    sort: String,
    area: Object,
    date: Object,
    keyword: String,
});

const emit = defineEmits(['update:sort', 'update:area', 'update:date', 'update:keyword']);

function handleSortChange(newSort) {
    emit('update:sort', newSort);
}

function handleAreaChange(newArea) {
    emit('update:area', newArea);
}

function handleDateChange(newDate) {
    emit('update:date', newDate);
}

function handleSearch(keyword) {
    emit('update:keyword', keyword);
}

const selectedFilter = ref('전체');

function selectFilter(filter) {
    selectedFilter.value = filter;
    if (filter === '전체') {
        emit('update:area', { parent: '', child: '' });
        emit('update:date', { startDate: '', endDate: '' });
    }
}

const router = useRouter();

const handleWritePackage = () => {
    router.push('/packages/write');
};

const goToPackages = () => {
    window.location.reload();
};
</script>

<template>
    <div style="padding-left: 300px; padding-right: 300px; padding-bottom: 80px">
        <div
            class="d-flex align-items-center"
            style="gap: 10px; margin-left: 80px; margin-bottom: 41px">
            <button
                style="
                    font-size: 2rem;
                    font-weight: 700;
                    border: none;
                    background-color: transparent;
                "
                @click="goToPackages">
                패키지
            </button>
            <button class="text-white add-package-button" @click="handleWritePackage">
                등록하기
            </button>
        </div>
        <div class="d-flex align-items-center justify-content-between border-bottom border-black">
            <div class="d-flex align-items-center" style="gap: 16px">
                <button
                    class="filter-button"
                    :class="{ active: selectedFilter === '전체' }"
                    @click="selectFilter('전체')">
                    전체
                </button>
                <AreaSelectDropdown :area="area" @update:area="handleAreaChange" />
                <DateSelectDropdown :date="date" @update:date="handleDateChange" />
            </div>
            <div class="d-flex" style="gap: 16px; position: relative">
                <SearchBar placeholder="원하는 패키지를 검색해보세요!" @search="handleSearch" />
                <SortDropdown :sort="sort" @update:sort="handleSortChange" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.add-package-button {
    background-color: #757575;
    border-radius: 20px;
    font-size: 1.2rem;
    font-weight: 400;
    width: 120px;
    height: 40px;
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
</style>
