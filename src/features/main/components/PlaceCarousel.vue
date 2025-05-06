<script setup>
import { ref } from 'vue';
import carouselArrow from '@/assets/carousel-arrow.svg';

// 나중에 장소에서 받아올 듯
const place = ref([
    {
        placeId: 1,
        imgUrl: 'https://d152i3f1t56z95.cloudfront.net/test/image.png',
        title: '국립 중앙 박물관',
        detail: '서울특별시 용산구 용산동6가 (용산기지)에 위치한 한국 최대의 대표 국립 박물관이다. 서울특별시 용산구 용산동6가 (용산기지)에 위치한 한국 최대의 대표 국립 박물관이다.',
    },
    {
        placeId: 2,
        imgUrl: 'https://d152i3f1t56z95.cloudfront.net/test/image.png',
        title: '국립 가장자리 박물관',
        detail: '서울특별시 용산구 용산동6가 (용산기지)에 위치한 한국 두 번째 대표 국립 박물관이다. 서울특별시 용산구 용산동6가 (용산기지)에 위치한 한국 최대의 대표 국립 박물관이다.',
    },
    {
        placeId: 3,
        imgUrl: 'https://d152i3f1t56z95.cloudfront.net/test/image.png',
        title: '국립 구석 박물관',
        detail: '서울특별시 용산구 용산동6가 (용산기지)에 위치한 한국 세 번째 대표 국립 박물관이다. 서울특별시 용산구 용산동6가 (용산기지)에 위치한 한국 최대의 대표 국립 박물관이다.',
    },
]);

// 초기 슬라이드 값은 0으로 설정, 0부터 시작
const currentSlide = ref(0);

// 슬라이드 이동 함수
function moveSlide(direction) {
    console.log('계산 전', currentSlide.value);
    currentSlide.value = (currentSlide.value + direction + place.value.length) % place.value.length;
    console.log('계산 후', currentSlide.value);
    console.log(typeof currentSlide.value);
}
</script>
<template>
    <div class="carousel-container">
        <!-- 이전 버튼 -->
        <button class="prev" @click="moveSlide(-1)">
            <img :src="carouselArrow" />
        </button>

        <!-- 캐러셀 이미지 -->
        <!-- <div class="carousel"> -->
        <div
            class="slide"
            v-for="(item, index) in place"
            :key="index"
            :style="{ transform: `translateX(-${currentSlide.value * 100}%)` }">
            <img :src="item.imgUrl" alt="Slide Image" class="carousel-image" />
            <div class="text-info">
                <span class="title">{{ item.title }}</span>
                <span class="detail">{{ item.detail }}</span>
            </div>
            <router-link :to="`/place/${item.placeId}`">
                <button class="more-info">더 알아보기</button>
            </router-link>
        </div>
        <!-- </div> -->

        <!-- 다음 버튼 -->
        <button class="next" @click="moveSlide(1)">
            <img :src="carouselArrow" style="transform: scaleX(-1)" />
        </button>

        <!-- 동그라미로 현재 슬라이드 표시 -->
        <div class="dots">
            <span
                v-for="(item, index) in place"
                :key="index"
                :class="{ active: currentSlide.value === index }"
                @click="currentSlide.value = index"
                class="dot"></span>
        </div>
    </div>
</template>
<style scoped>
.carousel-container {
    position: relative;
    width: 100%;
    height: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    overflow: hidden; /* 화면을 넘어가는 부분을 숨깁니다 */
}

/* .carousel {
    display: flex;
    transition: transform 0.3s ease-in-out; /* 슬라이드 전환 시 부드럽게 이동하도록 설정 } */

.slide {
    width: 100%;
    position: relative;
    flex-shrink: 0;
    display: flex;
    transition: transform 0.3s ease-in-out;
}

.carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.text-info {
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    font-weight: bold;
    display: flex;
    flex-direction: column;
}

.title {
    font-size: 2rem;
    color: white;
}

.detail {
    font-size: 1.8rem;
    font-weight: 400;
    color: white;
}

button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    background-color: transparent;
    color: white;
    border: none;
    cursor: pointer;
}

.more-info {
    top: 500px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #478dff;
    font-size: 1.5rem;
    width: 152px;
    height: 48px;
}

.prev {
    height: 32px;
    left: 20px;
    z-index: 2;
}

.next {
    right: 20px;
    z-index: 2;
}

.dots {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
}

.dot {
    width: 10px;
    height: 10px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.dot.active {
    background-color: white;
}
</style>
