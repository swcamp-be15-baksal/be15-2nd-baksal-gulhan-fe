<script setup>
import heartIcon from '@/assets/heart.svg';

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
    linkPrefix: {
        type: String,
        default: '/packages',
    },
    idKey: {
        type: String,
        default: 'packageId',
    },
    showDate: {
        type: Boolean,
        default: true,
    },
});
</script>

<template>
    <div class="card">
        <router-link :to="`${linkPrefix}/${data[idKey]}`">
            <div class="data-img">
                <div class="category-label">{{ data.area }}</div>
                <img :src="data.image || 'https://d152i3f1t56z95.cloudfront.net/test/image.png'" />
            </div>
            <div>
                <div class="main-info">{{ data.title }}</div>
                <div class="main-info" v-if="showDate">
                    {{ formatDate(data.startDate) }} ~ {{ formatDate(data.endDate) }}
                </div>
                <div class="card-bottom">
                    <div class="price">{{ data.price.toLocaleString() }}원</div>
                    <div class="like-review">
                        <img :src="heartIcon" style="width: 22.5px; height: 20px" />
                        <span style="color: #ff268f">{{ data.likeCount ?? 0 }}</span>
                        <span style="color: #adadad">({{ data.reviewCount ?? 0 }})</span>
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
    return date.toISOString().split('T')[0];
}
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
    margin-bottom: 24px;
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
    font-size: 1.6rem;
    color: black;
    font-weight: 700;
}

.card-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.price {
    font-size: 1.6rem;
    color: black;
}

.like-review {
    display: flex;
    font-size: 1.4rem;
    align-items: center;
    gap: 4px;
}
</style>
