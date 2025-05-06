<script setup>
import heartIcon from '@/assets/heart.svg';

defineProps({
    data: {
        type: Object,
        required: true,
    },
    linkPrefix: {
        type: String,
        default: '/place',
    },
    idKey: {
        type: String,
        default: 'placeId',
    },
    categoryKey: {
        type: String,
        default: 'category',
    },
});
</script>

<template>
    <div class="card">
        <router-link :to="`${linkPrefix}/${data[idKey]}`">
            <div class="data-img">
                <div class="category-label">{{ data[categoryKey] }}</div>
                <img :src="data.image || 'https://d152i3f1t56z95.cloudfront.net/test/image.png'" />
            </div>
            <div>
                <div class="main-info">{{ data.title }}</div>
                <div class="address">
                    {{ data.address }}
                </div>
                <div class="card-bottom">
                    <div class="like">
                        <img :src="heartIcon" style="width: 22.5px; height: 20px" />
                        <span style="color: #ff268f">{{ data.likeCount ?? 0 }}</span>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>

</script>

<style scoped>
.card {
    border: none;
    overflow: hidden;
    display: flex;
    background-color: #fffdf8;
    max-width: 480px;
    max-height: 490px;
}

.card a {
    color: inherit;
    text-decoration: none;
}
.data-img {
    position: relative;
    width: 100%;
    margin-bottom: 12px;
}

.data-img img {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
    border-radius: 20px;
}
.category-label {
    position: absolute;
    top: 14px;
    left: 16px;
    border: none;
    background-color: #3e4042;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 400;
    color: white;
    padding: 4px 12px;
}

.main-info {
    font-size: 1.5rem;
    color: black;
    font-weight: 700;
}

.address {
    font-size: 1.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: black;
    max-width: 480px;
    max-height: 490px;
}

.card-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.like {
    display: flex;
    font-size: 1.4rem;
    align-items: center;
    gap: 4px;
}
</style>
