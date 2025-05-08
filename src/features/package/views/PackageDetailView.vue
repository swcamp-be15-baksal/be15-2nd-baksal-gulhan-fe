<!-- 수정된 화면 파일 -->
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import PackageHeader from '@/features/package/components/PackageHeader.vue';
import DetailCard from '@/components/common/DetailCard.vue';
import DetailReviewTab from '@/components/common/DetailReviewTab.vue';

import { fetchPackageDetail } from '@/features/package/api.js';

const route = useRoute();
const packagesData = ref(null);

onMounted(async () => {
    try {
        const id = route.params.id;
        const response = await fetchPackageDetail(id);
        packagesData.value = response.data.data;
    } catch (err) {
        console.error('패키지 상세 조회 실패: ', err);
    }
});
</script>

<template>
    <PackageHeader />
    <DetailCard
        v-if="packagesData"
        :data="packagesData"
        :categoryKey="'area'"
        :showDate="true"
        :showGuide="true" />
    <DetailReviewTab
        v-if="packagesData"
        :detail="packagesData.detail"
        :reviewCount="packagesData.reviewCount" />
</template>
