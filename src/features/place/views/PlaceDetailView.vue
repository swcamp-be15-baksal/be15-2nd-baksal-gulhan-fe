<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import DetailCard from '@/features/place/component/DetailCard.vue';
import { getPlaceDetail } from '@/features/place/api.js';

const route = useRoute();
const router = useRouter();
const placesData = ref(null);

const categoryText = computed(() => {
  switch (placesData.value?.category) {
    case 'MUSEUM':
      return '박물관';
    case 'FOLK_VILLAGE':
      return '민속촌';
    case 'HISTORIC_SITE':
      return '유적지';
  }
});

onMounted(async () => {
  const id = Number(route.params.id);
  console.log('현재 ID:', route.params.id);
  try {
    const response = await getPlaceDetail(id);
    placesData.value = response.data.data.place; // ✅ 백엔드 응답 구조에 맞게
  } catch (e) {
    console.error('장소 상세 조회 실패:', e);
  }
});

function goToPlaceList() {
  router.push({ path: '/place' });
}
</script>

<template>
  <div v-if="placesData" class="place-detail-view">
    <div class="breadcrumb">
      <span class="breadcrumb-link" @click="goToPlaceList">관람정보</span>
      <span class="breadcrumb-separator">&gt;</span>
      <span class="breadcrumb-current">{{ categoryText }}</span>
    </div>
    <DetailCard
      :data="placesData"
      categoryKey="category"
    />
  </div>
</template>

<style scoped>
.place-detail-view {
  max-width: 1166px;
  margin: 0 auto;
}
.breadcrumb {
  display: flex;
  align-items: center;
  font-size: 1rem;
  margin-bottom: 16px;
}
.breadcrumb-link,
.breadcrumb-current {
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.75);
}
.breadcrumb-link {
  cursor: pointer;
}
.breadcrumb-link:hover {
  opacity: 0.7;
}
.breadcrumb-separator {
  margin: 0 8px;
  color: #666;
}
</style>
