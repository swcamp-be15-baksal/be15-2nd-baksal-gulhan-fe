<script setup>
import { ref } from 'vue';
import GoodsHeader from '@/features/goods/components/GoodsHeader.vue';
import GoodsList from '@/features/goods/components/GoodsList.vue';

const selectedSort = ref('가나다순');
const selectedCategory = ref('전체');
const selectedKeyword = ref('');
</script>

<template>
    <GoodsHeader
        v-model:sort="selectedSort"
        v-model:category="selectedCategory"
        v-model:keyword="selectedKeyword" />
    <GoodsList :sort="selectedSort" :category="selectedCategory" :keyword="selectedKeyword" />
</template>

<style scoped></style>
