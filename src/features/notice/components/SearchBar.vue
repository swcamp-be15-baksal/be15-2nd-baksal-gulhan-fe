<script setup>
import { ref } from 'vue'

const keyword = ref('')
</script>

<template>
  <div class="notice-search">
    <input type="search" placeholder="검색어를 입력하세요." v-model="keyword" />
  </div>
</template>

<style scoped>
.notice-search {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.notice-search input {
  width: 200px;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
