<script setup>
import ReviewForm from '@/features/mypage/components/form/review/ReviewForm.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const initialData = ref(null);

onMounted(async () => {
  const route = useRoute();

  /* api로 패키지 or 기념품 정보 불러오기*/
  // 테스트용
  initialData.value = {
    reviewId: route.query.reviewId,
    detail: route.query.content,
    rating: route.query.rating,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP6ecgsNy1Qi0qVOlD3jfeWg6IDW89ZV8chA&s'
  };

});

console.log(initialData.value)
</script>

<template>
  <h2 class="text-center fw-bold fs-3 mb-5">리뷰 수정</h2>
  <ReviewForm :initialData="initialData" submitLabel="수정" />
</template>
