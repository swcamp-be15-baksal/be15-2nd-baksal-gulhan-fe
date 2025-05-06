<!-- 수정된 화면 파일 -->
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import DetailCard from '@/features/place/component/DetailCard.vue';
import places from '@/features/place/mock/places.json';
import PlaceHeader from '@/features/place/component/PlaceHeader.vue';

const route = useRoute();
const placesData = ref(null);

onMounted(() => {
    const id = Number(route.params.id);
    placesData.value = places.find((p) => p.placeId === id);
});
</script>

<template>
    <PlaceHeader />
    <DetailCard
        v-if="placesData"
        :data="placesData"
        :categoryKey="'category'"
    />
</template>
