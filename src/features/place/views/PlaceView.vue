<template>
  <div>
    <!-- 필터 상태를 자식에서 받아와서 리스트에 전달 -->
    <PlaceHeader
      :active-filter="selectedFilter"
      @filter-change="handleFilterChange"
      @areaId-change="handleAreaIdChange"
      @title-change="handleTitleChange"
    />
    <PlaceList
      :filter="selectedFilter"
      :childAreaId="childAreaId"
      :title="title" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PlaceHeader from '@/features/place/component/PlaceHeader.vue';
import PlaceList from '@/features/place/component/PlaceList.vue';

// 선택된 필터 상태
const selectedFilter = ref('전체');
const childAreaId = ref(null);
const title = ref('');


// 헤더에서 필터 변경 이벤트 처리
function handleFilterChange(filter) {
  selectedFilter.value = filter;
}

function handleAreaIdChange(areaId){
  childAreaId.value = areaId;
  console.log(childAreaId.value);
}

function handleTitleChange(keyword) {
  title.value = keyword;
}
</script>

<style scoped>
/* 전체 스타일 없음 */
</style>
