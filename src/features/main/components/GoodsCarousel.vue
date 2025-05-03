<script setup>
import { ref } from 'vue';
import { Carousel, Pagination, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import { useRouter } from 'vue-router';

const slides = ref([
    'https://d152i3f1t56z95.cloudfront.net/test/image.png',
    'https://d152i3f1t56z95.cloudfront.net/test/image.png',
    'https://d152i3f1t56z95.cloudfront.net/test/image.png',
]);

const router = useRouter();

function goToGoods() {
    router.push('/goods');
}
</script>

<template>
    <div style="display: flex; flex-direction: column">
        <div class="header">
            <span style="font-size: 2.2rem; color: black; font-weight: 700">패키지</span>
            <button @click="goToGoods">+ 더보기</button>
        </div>
        <div class="wrapper">
            <Carousel :autoplay="3000" wrap-around="false">
                <Slide v-for="slide in slides" :key="slide">
                    <div class="carousel__item">
                        <img class="slideImg" :src="slide" />
                    </div>
                </Slide>
                <template #addons>
                    <Pagination />
                </template>
            </Carousel>
        </div>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    margin: 20px 0px;
}

.header button {
    font-size: 1.5rem;
    color: black;
    font-weight: 400;
    border: none;
    background-color: transparent;
}

.carousel__item {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

.slideImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.wrapper {
    width: 100%;
    margin: 0 auto;
}
</style>
