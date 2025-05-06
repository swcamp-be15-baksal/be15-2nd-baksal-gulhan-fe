<script setup>
import GoodsHeader from '@/features/goods/components/GoodsHeader.vue';
import GoodsList from '@/features/goods/components/GoodsList.vue';
</script>

<template>
    <GoodsHeader v-model:sort="selectedSort" />
    <GoodsList :sort="selectedSort" />
</template>

<style scoped></style>
