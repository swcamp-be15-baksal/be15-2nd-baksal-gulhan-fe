<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
    data: Object,
    linkPrefix: { type: String, default: '/place' },
    idKey: { type: String, default: 'placeId' },
    categoryKey: { type: String, default: 'category' },
    targetTypeKey: { type: String, default: null }, // 👈 추가
});

const categoryLabel = computed(() => {
  switch (props.data[props.categoryKey]) {
    case 'MUSEUM': return '박물관';
    case 'FOLK_VILLAGE': return '민속촌';
    case 'HISTORIC_SITE': return '유적지';
    default: return '';
  }
});


const place = ref({ ...props.data });

watch(
    () => props.data,
    (newData) => {
        if (newData) {
            place.value = { ...newData };
            console.log('place 데이터 변경 감지:', newData);
        }
    },
    { immediate: true }
);
</script>

<template>
    <div class="card">
        <router-link
            :to="{
                path: `${linkPrefix}/${props.data[idKey]}`,
                query: {
                    placeId: props.data[idKey],
                    targetType: props.data[targetTypeKey] || 'PLACE',
                },
            }"
            class="card-link">
            <div class="data-img">
                <img
                    :src="
                        props.data.image || 'https://d152i3f1t56z95.cloudfront.net/test/image.png'
                    "
                    alt="place image" />
                <div class="category-label">{{ categoryLabel }}</div>
            </div>
            <div class="card-content">
                <div class="main-info">{{ props.data.title }}</div>
                <div class="address">{{ props.data.address }}</div>
                <div class="card-bottom"></div>
            </div>
        </router-link>
    </div>
</template>

<style scoped>
.card {
    background-color: #fffdf8;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.card-link {
    display: block;
    color: inherit;
    text-decoration: none;
}

.data-img img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 20px 20px 0 0;
}

.category-label {
    position: absolute;
    top: 12px;
    left: 12px;
    background-color: #3e4042;
    border-radius: 8px;
    padding: 4px 8px;
    font-size: 0.9rem;
    color: #fff;
    white-space: nowrap;
}

.card-content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.main-info {
    font-size: 1.5rem;
    font-weight: 700;
    color: #000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.address {
    font-size: 1.2rem;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.card-bottom {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
}
</style>
