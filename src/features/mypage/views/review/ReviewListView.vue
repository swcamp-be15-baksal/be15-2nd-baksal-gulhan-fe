<script setup>
import ReviewCard from '@/features/mypage/components/common/ReviewCard.vue';
import MyPageHeader from '@/features/mypage/components/common/MyPageHeader.vue';

import { ref, onMounted } from 'vue';
import { fetchUserReviews } from '@/features/mypage/api.js';
import { useToast } from 'vue-toastification';

const reviews = ref([]);
const toast = useToast();

onMounted(async () => {
    try {
        const res = await fetchUserReviews('PACKAGE');
        reviews.value = res.data.data.userReviewList.map((r) => ({
            id: r.reviewId,
            title: `ID: ${r.targetId} (${r.targetType})`,
            date: new Date(r.createdAt).toISOString().split('T')[0],
            rating: r.rating,
            content: r.detail,
            image: 'https://d152i3f1t56z95.cloudfront.net/test/image.png',
        }));
    } catch (err) {
        console.error('[리뷰 조회 오류]', err);
        console.log('[서버 응답]', err.response?.data);
        console.log('[요청 URL]', err.config?.url);
        console.log('[요청 params]', err.config?.params);
        toast.error('리뷰 불러오기 실패: ' + (err.response?.data?.message || err.message));
    }
});
</script>

<template>
    <MyPageHeader />
    <div class="d-flex flex-column align-items-center">
        <h2 class="text-center fw-bold fs-3 mb-5">내가 쓴 리뷰</h2>
        <ReviewCard v-for="review in reviews" :key="review.id" :review="review" />
    </div>
</template>
