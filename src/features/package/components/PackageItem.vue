<script setup>
import heartIcon from '@/assets/heart.svg';
const { packages } = defineProps({
    packages: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <div class="card">
        <router-link :to="`/packages/${packages.packageId}`">
            <div>
                <div>{{ packages.area }}</div>
                <img src="https://d152i3f1t56z95.cloudfront.net/test/image.png" />
            </div>
            <div>
                <div>{{ packages.title }}</div>
                <div>{{ formatDate(packages.startDate) }} ~ {{ formatDate(packages.endDate) }}</div>
                <div>
                    <div>{{ packages.price.toLocaleString() }}원</div>
                    <div>
                        <img :src="heartIcon" />
                        <span style="color: #ff268f">{{ packages.likeCount ?? 0 }}</span>
                        <span style="color: #adadad">{{ packages.reviewCount ?? 0 }}</span>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
function formatDate(ts) {
    if (!ts) return '';
    const date = new Date(ts);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
}
</script>

<style scoped>
.card {
    border: 1px solid #d9d9d9;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: white;
}
</style>
