<script setup>
import GoodsCarousel from '@/features/main/components/GoodsCarousel.vue';
import PackageCarousel from '@/features/main/components/PackageCarousel.vue';

import NoticeList from '@/features/main/components/NoticeList.vue';

import PlaceCarousel2 from '../components/PlaceCarousel2.vue';
import { onMounted, ref } from 'vue';
import { fetchNoticeList } from '@/features/notice/api/notice.js';
import { useToast } from 'vue-toastification';

const noticeList = ref([]);
const toast = useToast();

onMounted(async () => {
    try {
        const response = await fetchNoticeList({ size: 7 });
        console.log(...response.tmpList);
        noticeList.value = [...response.tmpList];
        console.log('메인에서 호출', noticeList.value);
    } catch (e) {
        toast.error(e.response.data.message);
    }
});
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 60px">
        <PlaceCarousel2 />
        <!-- border: 2px solid black; margin-bottom: 60px -->
        <div style="padding: 0 108px; display: flex; flex-direction: column; gap: 60px">
            <PackageCarousel />

            <div style="display: flex; flex-direction: row; gap: 52px">
                <NoticeList style="flex: 1" :noticeList="noticeList" />
                <GoodsCarousel style="flex: 1" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
