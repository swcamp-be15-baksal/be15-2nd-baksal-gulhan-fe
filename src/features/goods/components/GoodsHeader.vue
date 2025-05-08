<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import SearchBar from '@/components/common/SearchBar.vue';
import DropDown from '@/features/goods/components/DropDown.vue';

const props = defineProps({
    sort: String,
    category: String,
    keyword: String,
});

const emit = defineEmits(['update:sort', 'update:category', 'update:keyword']);

const selectedFilter = ref(props.category || '전체');
const selectedSort = ref(props.sort || '가나다순');
const searchKeyword = ref(props.keyword || '');

watch(selectedFilter, (val) => emit('update:category', val));
watch(selectedSort, (val) => emit('update:sort', val));
watch(searchKeyword, (val) => emit('update:keyword', val));

const selectFilter = (filter) => {
    selectedFilter.value = filter;
};

const handleSortChange = (newSort) => {
    selectedSort.value = newSort;
};

const handleSearch = (keyword) => {
    searchKeyword.value = keyword;
};

const router = useRouter();
const handleWriteGoods = () => {
    router.push('/goods/write');
};
</script>

<template>
    <div style="padding: 80px 60px">
        <div
            class="d-flex align-items-center"
            style="gap: 10px; margin-left: 80px; margin-bottom: 41px">
            <span style="font-size: 2rem; font-weight: 700"> 기념품 </span>
            <button class="text-white add-package-button" @click="handleWriteGoods">
                등록하기
            </button>
        </div>
        <div class="d-flex align-items-center justify-content-between border-bottom border-black">
            <div>
                <button
                    v-for="category in [
                        '전체',
                        '사무문구',
                        '생활잡화',
                        '악세서리',
                        '디지털전자',
                        '주방식품',
                    ]"
                    :key="category"
                    class="filter-button"
                    :class="{ active: selectedFilter === category }"
                    @click="selectFilter(category)">
                    {{ category }}
                </button>
            </div>
            <div class="d-flex" style="gap: 16px">
                <SearchBar placeholder="원하는 기념품을 검색해보세요!" @search="handleSearch" />
                <DropDown :sort="selectedSort" @update:sort="handleSortChange" />
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
    padding: 17px 36px;
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
</style>
