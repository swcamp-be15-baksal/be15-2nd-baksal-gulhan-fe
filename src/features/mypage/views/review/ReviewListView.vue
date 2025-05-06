<script setup>
import ReviewCard from '@/features/mypage/components/common/ReviewCard.vue';
import { ref } from 'vue';

import MyPageHeader from '@/features/mypage/components/common/MyPageHeader.vue';

const reviews = ref([
    {
        id: 1,
        title: '조선 마스킹 테이프',
        date: '2025.04.23',
        rating: 2,
        content:
            '생각보다 색상이 너무 누런데 생각했던 이미지랑 맞아서 잘 쓰고 있음. \n' +
            '친구들이 뭐 이런 걸 쓰냐고 했지만 제 취향인 걸 어쩌겠나요?\n' +
            '근데 리뷰 쓰면 포인트 안 주나요? 얼른 평민 탈출하고 싶음 ㅋ',
        image: 'https://i.postimg.cc/Hm6p7PW8/2025-05-04-1-13-40.png',
    },
    {
        id: 2,
        title: '제주도 힐링 여행',
        date: '2025.04.23',
        rating: 5,
        content: '정말 알찬 여행이었어요! 다시 가고 싶습니다.',
        image: 'https://www.chosun.com/resizer/v2/L6S6JPZN2B5VE264FZVKUIFUKQ.jpg?auth=52a0002e7ffb011d596b281c1948ca521b7a37df68551af3b5595df5a238cc6e&width=586&height=714&smart=true',
    },
]);
</script>

<template>
  <MyPageHeader />
  <div class="d-flex flex-column align-items-center">
    <h2 class="text-center fw-bold fs-3 mb-5">내가 쓴 리뷰</h2>
    <ReviewCard v-for="review in reviews" :key="review.id" :review="review" />
  </div>
</template>
