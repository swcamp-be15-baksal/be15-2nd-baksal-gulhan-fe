<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import DetailCard from '@/features/place/component/DetailCard.vue';
import places from '@/features/place/mock/places.json';

const route = useRoute();
const router = useRouter();
const placesData = ref(null);

onMounted(() => {
  const id = Number(route.params.id);
  placesData.value = places.find(p => p.placeId === id);
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
      <span class="breadcrumb-current">{{ placesData.category }}</span>
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
