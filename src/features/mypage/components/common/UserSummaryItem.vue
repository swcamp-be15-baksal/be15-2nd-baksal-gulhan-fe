<script setup>
import RankList from '@/features/mypage/components/list/rank/RankList.vue';
import { ref } from 'vue';

defineProps({
  userInfo: Object,
  maskedUsername : String,
  rankDisplayMap : Object,
})
const showRankList = ref(false);
// 임시
const totalPurchase = ref(0);
</script>
<template>
  <div class="bg-white border rounded-3 p-4 mb-4">
    <router-link :to="`/mypage/userinfo`" class="text-decoration-none text-dark">
      <h3 class="h5 fw-bold mb-2">{{ maskedUsername }}님 안녕하세요!</h3>
    </router-link>

    <div
      class="d-inline-block position-relative"
      @mouseenter="showRankList = true"
      @mouseleave="showRankList = false"
    >
      <span class="text-muted">
        {{ rankDisplayMap[userInfo.rankName] || '등급 없음' }} ∙ {{ userInfo.pointRate }}% 적립
      </span>
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
      <span class="fs-5 fw-semibold">{{ userInfo.point }}원</span>
    </div>
    <div class="flex-fill d-flex align-items-center">
      <span class="fs-5 text-secondary me-3">총 구매액</span>
      <span class="fs-5 fw-semibold">{{ totalPurchase }}원</span>
    </div>
  </div>
</template>

