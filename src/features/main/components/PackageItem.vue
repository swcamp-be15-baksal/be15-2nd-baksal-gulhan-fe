<script setup>
import heartIcon from '@/assets/icons/heart.svg';

const props = defineProps({
    packages: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <div class="item">
        <router-link :to="`/packages/${packages.packageId}`">
            <div class="packages-img">
                <img
                    :src="
                        packages.image || 'https://d152i3f1t56z95.cloudfront.net/test/image.png'
                    " />
            </div>
            <div class="info">
                <div class="title">{{ packages.title }}</div>
                <div class="like-count">
                    <img :src="heartIcon" style="width: 16px; height: auto" />
                    <span style="color: #ff268f">{{ packages.likeCount ?? 0 }}</span>
                </div>
            </div>
        </router-link>
    </div>
</template>

<style scoped>
.item {
    border: none;
    overflow: hidden;
    display: flex;
    background-color: transparent;
    width: auto;
    max-height: 320px;
}

.item a {
    color: inherit;
    text-decoration: none;
}

.packages-img {
    position: relative;
    width: 100%;
    margin-bottom: 12px;
}

.packages-img img {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
}

.info {
    display: flex;
    justify-content: space-between;
}

.title {
    font-size: 1rem;
    color: black;
    font-weight: 700;
}

.like-count {
    display: flex;
    font-size: 1rem;
    align-items: center;
    gap: 4px;
}
</style>
