<script setup>
import GoodsCarousel from '@/features/main/components/GoodsCarousel.vue';
import PackageCarousel from '@/features/main/components/PackageCarousel.vue';

import NoticeList from '@/features/main/components/NoticeList.vue';

import PlaceCarousel from '@/features/main/components/PlaceCarousel.vue';
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 60px">
        <PlaceCarousel />
        <!-- border: 2px solid black; margin-bottom: 60px -->
        <PackageCarousel />

        <div style="display: flex; flex-direction: row; gap: 52px">
            <NoticeList style="flex: 1" />
            <GoodsCarousel style="flex: 1" />
        </div>
    </div>
</template>

<style scoped></style>
