<!-- 수정된 화면 파일 -->
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import GoodsHeader from '@/features/goods/components/GoodsHeader.vue';
import DetailCard from '@/components/common/DetailCard.vue';
import DetailReviewTab from '@/components/common/DetailReviewTab.vue';
import ReviewItem from '@/features/review/components/ReviewItem.vue';
import { fetchGoodsDetail } from '@/features/goods/api';

const route = useRoute();
const goodsData = ref(null);

onMounted(async () => {
    const id = Number(route.params.id);
    try {
        const res = await fetchGoodsDetail(id);
        goodsData.value = res.data.data;
    } catch (err) {
        console.error('[GoodsDetailView] 상품 상세 조회 실패:', err);
    }
});
</script>

<template>
    <div style="padding-left: 300px; padding-right: 300px; padding-bottom: 80px" />
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
