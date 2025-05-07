<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PackageItem from '@/features/main/components/PackageItem.vue';
import packages from '@/features/package/mock/packages.json';
const router = useRouter();

function goToPackages() {
    router.push('/packages');
}
</script>

<template>
    <div style="width: 100%; margin: 0; padding: 0">
        <div class="header">
            <span style="font-size: 2.2rem; color: black; font-weight: 700">패키지</span>
            <button @click="goToPackages">+ 더보기</button>
        </div>
        <div class="grid">
            <PackageItem
                v-for="item in packages.slice(0, 4)"
                :key="item.packageId"
                :packages="item" />
        </div>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0px;
}

.header button {
    font-size: 1.5rem;
    color: black;
    font-weight: 400;
    border: none;
    background-color: transparent;
}

.grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 52px;
}
</style>
