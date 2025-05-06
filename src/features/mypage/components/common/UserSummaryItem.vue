<template>
  <div class="bg-white border rounded-3 p-4 mb-4">
    <router-link :to="`/mypage/userinfo`" class="text-decoration-none text-dark">
      <h3 class="h5 fw-bold mb-2">{{ username }}님 안녕하세요!</h3>
    </router-link>

    <div
      class="d-inline-block position-relative"
      @mouseenter="showRankList = true"
      @mouseleave="showRankList = false"
    >
      <span class="text-muted small">{{ user_rank }} ∙ {{ point_rate }}% 적립</span>
      <RankList
        v-if="showRankList"
        class="position-absolute"
        style="top: 24px; left: 0;"
      />
    </div>
  </div>

  <div class="bg-white border rounded-3 p-4 mb-4 d-flex flex-wrap align-items-center">
    <div class="flex-fill d-flex align-items-center mb-2 mb-sm-0">
      <span class="fs-5 text-secondary me-3">적립금</span>
      <span class="fs-5 fw-bold">{{ point }}원</span>
    </div>
    <div class="flex-fill d-flex align-items-center">
      <span class="fs-5 text-secondary me-3">총 구매액</span>
      <span class="fs-5 fw-bold">{{ total_purchase }}원</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import RankList from '@/features/mypage/components/list/rank/RankList.vue';

const showRankList = ref(false);

const username = '윤채영';
const user_rank = '평민';
const point_rate = 1;
const point = 1500;
const total_purchase = 150000;
</script>
