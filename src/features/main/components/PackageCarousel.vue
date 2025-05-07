<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import PackageItem from '@/features/main/components/PackageItem.vue';
import { fetchPackageList } from '@/features/package/api.js';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();
const packages = ref([]);

function goToPackages() {
    router.push('/packages');
}

onMounted(async () => {
    try {
        const res = await fetchPackageList({ page: 1, size: 4 });
        packages.value = res.data.data.packages;
    } catch (err) {
        toast.error('패키지 불러오기 실패: ' + (err.response?.data?.message || err.message));
    }
});
</script>

<template>
    <div style="width: 100%; margin: 0; padding: 0">
        <div class="header">
            <span style="font-size: 2.2rem; color: black; font-weight: 700">패키지</span>
            <button @click="goToPackages">+ 더보기</button>
        </div>
        <div class="grid">
            <PackageItem v-for="item in packages" :key="item.packageId" :packages="item" />
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
