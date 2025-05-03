<script setup>
import ReviewCard from '@/features/mypage/components/ReviewCard.vue';
import { ref } from 'vue';

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
    image: 'https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-ab8c-61f7-8e00-d8993e4f9664/raw?se=2025-05-03T17%3A18%3A32Z&sp=r&sv=2024-08-04&sr=b&scid=6f20476c-017d-5e90-b376-5faf85cd154b&skoid=dfdaf859-26f6-4fed-affc-1befb5ac1ac2&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-02T20%3A37%3A48Z&ske=2025-05-03T20%3A37%3A48Z&sks=b&skv=2024-08-04&sig=eLXY8V%2BCS/bQERbPasMNv7bBJoIo6v503xeY3T3kHcs%3D'
  },
  {
    id: 2,
    title: '제주도 힐링 여행',
    date: '2025.04.23',
    rating: 5,
    content: '정말 알찬 여행이었어요! 다시 가고 싶습니다.',
    image: 'https://www.chosun.com/resizer/v2/L6S6JPZN2B5VE264FZVKUIFUKQ.jpg?auth=52a0002e7ffb011d596b281c1948ca521b7a37df68551af3b5595df5a238cc6e&width=586&height=714&smart=true'
  }
]);
</script>

<template>
  <div class="container">
    <ReviewCard v-for="review in reviews" :key="review.id" :review="review" />
  </div>
</template>
