<script setup>
import PackageItem from '@/features/package/components/PackageItem.vue';

const { packages } = defineProps({
    packages: {
        type: Array,
        required: true,
    },
});
</script>

<template>
    <div class="container">
        <PackageItem
            v-for="packages in packageList"
            :key="packages.packageId"
            :packages="packages" />
    </div>
</template>

<style scoped></style>
