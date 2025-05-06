<script setup>
import { ref } from 'vue';
import PackageHeader from '@/features/package/components/PackageHeader.vue';
import PackageList from '@/features/package/components/PackageList.vue';
const selectedSort = ref('시작일 빠른순');
const selectedArea = ref('');
const selectedDateRange = ref({ startDate: '', endDate: '' });
</script>

<template>
    <PackageHeader
        v-model:sort="selectedSort"
        v-model:date="selectedDateRange"
        v-model:area="selectedArea" />

    <PackageList :sort="selectedSort" />
</template>

<style scoped></style>
