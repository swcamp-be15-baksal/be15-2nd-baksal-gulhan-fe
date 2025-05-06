<script setup>
import { ref, computed } from 'vue';
import PlaceItem from '@/features/place/component/ItemCard.vue';
import places from '@/features/place/mock/places.json';
import PaginationBar from '@/components/common/PaginationBar.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const currentPage = ref(Number(route.query.page) || 1);

const itemsPerPage = 30;

const totalPages = computed(() => Math.ceil(places.length / itemsPerPage));

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return places.slice(start, start + itemsPerPage);
});

function updatePage(page) {
  router.push({
    query: { ...route.query, page: page },
  });
  currentPage.value = page;
}

// 여기 pagination 로직 나중에 싹 다 수정해야 됨
</script>

<template>
  <div class="place-list-wrapper">
    <div class="grid">
      <PlaceItem
        v-for="item in paginatedItems"
        :key="item.placeId"
        :data="item"
        :linkPrefix="'/place'"
        :idKey="'placeId'"
      />
    </div>
    <PaginationBar
      :current-page="currentPage"
      :total-pages="totalPages"
      @update:page="updatePage" />
  </div>
</template>

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
