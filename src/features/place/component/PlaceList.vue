<template>
    <div class="place-list-wrapper">
        <div class="grid">
            <PlaceItem
                v-for="place in paginatedPlaces"
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
import { ref, computed, watch, reactive } from 'vue';
import PlaceItem from '@/features/place/component/ItemCard.vue';
import PaginationBar from '@/components/common/PaginationBar.vue';
import { getPlaces } from '@/features/place/api.js';
// import places from '@/features/place/mock/places.json'

const props = defineProps({ filter: { type: String, default: '전체' }, childAreaId: {type: Number} });

const currentPage = ref(1);
const places = reactive([]);
const itemsPerPage = 30;

// 필터 prop에 따른 장소 필터링
const filteredPlaces = computed(() =>
    props.filter === '전체' ? places : places.filter((p) => p.category === props.filter)
);

const totalPages = computed(() => Math.ceil(filteredPlaces.value.length / itemsPerPage));

const paginatedPlaces = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return filteredPlaces.value.slice(start, start + itemsPerPage);
});

function onPageChange(page) {
    currentPage.value = page;
}

// 필터 변경 시 페이지 초기화
watch(
    () => props.filter,
    () => {
        currentPage.value = 1;
    }
);

watch(() => props.childAreaId, async () => {
  const params = {
    areaId: props.childAreaId
  }
  const response = await getPlaces(params)
  places.value = response.data.data.places;
  console.log("장소 정보", places.value)
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
