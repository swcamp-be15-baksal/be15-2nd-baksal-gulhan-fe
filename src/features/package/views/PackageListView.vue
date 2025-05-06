<script setup>
import { ref } from 'vue';
import PackageHeader from '@/features/package/components/PackageHeader.vue';
import PackageList from '@/features/package/components/PackageList.vue';

const selectedSort = ref('시작일 빠른순');
const selectedArea = ref({ parent: '', child: '' });
const selectedDateRange = ref({ startDate: '', endDate: '' });
const selectedKeyword = ref('');
</script>

<template>
    <PackageHeader
        v-model:sort="selectedSort"
        v-model:date="selectedDateRange"
        v-model:area="selectedArea"
        v-model:keyword="selectedKeyword" />

    <PackageList
        :sort="selectedSort"
        :area="selectedArea"
        :date="selectedDateRange"
        :keyword="selectedKeyword" />
</template>

<style scoped></style>
