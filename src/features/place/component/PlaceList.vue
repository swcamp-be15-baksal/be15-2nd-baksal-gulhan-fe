<template>
  <div class="place-list-wrapper">
    <div class="grid">
      <PlaceItem
        v-for="place in places"
        :key="place.placeId"
        :data="place"
        linkPrefix="/place"
        idKey="placeId" />
    </div>
    <PaginationBar
      :current-page="currentPage"
      :total-pages="totalPages"
      @update:page="onPageChange" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import PlaceItem from '@/features/place/component/ItemCard.vue';
import PaginationBar from '@/components/common/PaginationBar.vue';
import { getPlaces } from '@/features/place/api.js';

const props = defineProps({
  filter: { type: String, default: '전체' },
  childAreaId: { type: Number },
  title: { type: String, default: '' },
});

const currentPage = ref(1);
const totalPages = ref(1);
const places = ref([]);
const itemsPerPage = ref(1);

function onPageChange(page) {
  currentPage.value = page;
}

// category, areaId, page 변경 감지
watch([currentPage, () => props.filter, () => props.childAreaId, () => props.title], async () => {
  const params = {
    areaId: props.childAreaId,
    page: currentPage.value,
    category: props.filter === '전체' ? null : props.filter, // ✅ 카테고리 필터 추가
    title: props.title,
  };
  const response = await getPlaces(params);
  places.value = response.data.data.places;

  const pagination = response.data.data.pagination;
  itemsPerPage.value = pagination.size;
  currentPage.value = pagination.currentPage;
  totalPages.value = pagination.totalPage;
});

onMounted(async() => {
  const response = await getPlaces();
  places.value = response.data.data.places;
  const pagination =  response.data.data.pagination
  itemsPerPage.value = pagination.size;
  currentPage.value = pagination.currentPage;
  totalPages.value = pagination.totalPage;
})
</script>

<style scoped>
.place-list-wrapper {
  max-width: 1040px;
  margin: 0 auto;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 52px;
}
</style>
