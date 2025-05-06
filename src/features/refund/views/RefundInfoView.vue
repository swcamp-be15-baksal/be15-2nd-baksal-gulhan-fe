<script setup>
import RefundInfo from '@/features/refund/components/RefundInfo.vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const itemId = Number(route.params.id); // 여기서 숫자로 형변환 OK
</script>

<template>
  <div>
    <RefundInfo :itemId="itemId" />
  </div>
</template>
