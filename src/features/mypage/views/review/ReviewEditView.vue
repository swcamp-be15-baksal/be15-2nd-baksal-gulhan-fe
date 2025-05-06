<script setup>
import ReviewForm from '@/features/mypage/components/form/review/ReviewForm.vue';
import { onMounted, ref } from 'vue';

const initialData = ref(null);

onMounted(async () => {
  // 테스트용
  initialData.value = {
    detail: '대체적으로 좋았다네용',
    rating: 4,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP6ecgsNy1Qi0qVOlD3jfeWg6IDW89ZV8chA&s'
  };
});
</script>

<template>
  <h2 class="text-center fw-bold fs-3 mb-5">리뷰 수정</h2>
  <ReviewForm :initialData="initialData" submitLabel="수정" />
</template>
