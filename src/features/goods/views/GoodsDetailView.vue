<!-- 수정된 화면 파일 -->
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import GoodsHeader from '@/features/goods/components/GoodsHeader.vue';
import DetailCard from '@/components/common/DetailCard.vue';
import DetailReviewTab from '@/components/common/DetailReviewTab.vue';
import ReviewItem from '@/features/review/components/ReviewItem.vue';
import goods from '@/features/goods/mock/goods.json';

const route = useRoute();
const goodsData = ref(null);

onMounted(() => {
    const id = Number(route.params.id);
    goodsData.value = goods.find((g) => g.goodsId === id);
});
</script>

<template>
    <GoodsHeader />
    <DetailCard
        v-if="goodsData"
        :data="goodsData"
        :categoryKey="'goodsCategoryName'"
        :showDate="false"
        :showGuide="false" />
    <DetailReviewTab
        v-if="goodsData"
        :detail="goodsData.detail"
        :reviewCount="goodsData.reviewCount">
        <template #review>
            <ReviewItem />
        </template>
    </DetailReviewTab>
</template>
