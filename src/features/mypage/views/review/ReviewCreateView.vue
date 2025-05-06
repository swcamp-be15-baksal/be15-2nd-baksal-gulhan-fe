<script setup>
import ReviewForm from '@/features/mypage/components/form/review/ReviewForm.vue';
</script>

<template>
  <h2 class="text-center fw-bold fs-3 mb-5">리뷰 등록</h2>
  <ReviewForm :initialData="null" submitLabel="등록" />
</template>
