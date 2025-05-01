<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PackageHeader from '@/features/package/components/PackageHeader.vue';
import PackageDetailCard from '@/features/package/components/PackageDetailCard.vue';
import PackageTextInfo from '@/features/package/components/PackageTextInfo.vue';
import packages from '@/features/package/mock/packages.json';

const route = useRoute();
const packagesData = ref(null);

onMounted(() => {
    const id = Number(route.params.id);
    packagesData.value = packages.find((p) => p.packageId === id);
});
</script>

<template>
    <PackageHeader />
    <PackageDetailCard v-if="packagesData" :packages="packagesData" />
    <PackageTextInfo v-if="packagesData" :packages="packagesData" />
</template>

<style scoped></style>
