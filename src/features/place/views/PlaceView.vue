<template>
  <div>
    <!-- 필터 상태를 자식에서 받아와서 리스트에 전달 -->
    <PlaceHeader
      :active-filter="selectedFilter"
      @filter-change="handleFilterChange"
    />
    <PlaceList :filter="selectedFilter" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PlaceHeader from '@/features/place/component/PlaceHeader.vue';
import PlaceList from '@/features/place/component/PlaceList.vue';

// 선택된 필터 상태
const selectedFilter = ref('전체');

// 헤더에서 필터 변경 이벤트 처리
function handleFilterChange(filter) {
  selectedFilter.value = filter;
}
</script>

<style scoped>
/* 전체 스타일 없음 */
</style>
