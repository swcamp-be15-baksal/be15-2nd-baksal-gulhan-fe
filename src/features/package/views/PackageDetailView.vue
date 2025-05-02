<!-- 수정된 화면 파일 -->
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PackageHeader from '@/features/package/components/PackageHeader.vue';
import DetailCard from '@/components/common/DetailCard.vue';
import DetailReviewTab from '@/components/common/DetailReviewTab.vue';
import ReviewItem from '@/features/review/components/ReviewItem.vue';
import packages from '@/features/package/mock/packages.json';

const route = useRoute();
const packagesData = ref(null);

onMounted(() => {
    const id = Number(route.params.id);
    packagesData.value = packages.find((p) => p.packageId === id);
});
</script>

<template>
    <PackageHeader />
    <DetailCard v-if="packagesData" :data="packagesData" :showDate="true" :showGuide="true" />
    <DetailReviewTab
        v-if="packagesData"
        :detail="packagesData.detail"
        :reviewCount="packagesData.reviewCount">
        <template #review>
            <ReviewItem />
        </template>
    </DetailReviewTab>
</template>
