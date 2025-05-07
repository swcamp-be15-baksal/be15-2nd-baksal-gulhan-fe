<template>
    <div class="main-carousel">
        <Carousel
            ref="carouselRef"
            v-model:currentSlide="currentSlide"
            :wrap-around="true"
            :autoplay="2000"
            :pauseAutoplayOnHover="true">
            <Slide v-for="placeInfo in place" :key="placeInfo.placeId">
                <div class="image-wrapper">
                    <img class="place-image" :src="placeInfo.imgUrl" :alt="placeInfo.title" />
                    <div class="overlay center-overlay">
                        <h2>{{ placeInfo.title }}</h2>
                        <p>{{ placeInfo.detail }}</p>
                        <button class="overlay-button">자세히 보기</button>
                    </div>
                </div>
            </Slide>
        </Carousel>

        <!-- ✅ 직접 만든 좌우 화살표 버튼 -->
        <button class="nav-arrow left" @click="moveSlide(-1)">
            <img :src="carouselArrow" alt="left" class="arrow-icon" />
        </button>
        <button class="nav-arrow right" @click="moveSlide(1)">
            <img
                :src="carouselArrow"
                alt="right"
                class="arrow-icon"
                style="transform: scaleX(-1)" />
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';
import carouselArrow from '@/assets/carousel-arrow.svg';

const place = ref([
    {
        placeId: 22,
        imgUrl: 'http://tong.visitkorea.or.kr/cms/resource/64/3374064_image2_1.JPG',
        title: '거창 박물관',
        detail: '거창박물관은 거창을 너무나 사랑했던 고(故) 최남식, 김태순 두 분의 기증 유물을 전시하는 공간입니다.',
    },
    {
        placeId: 3,
        imgUrl: 'http://tong.visitkorea.or.kr/cms/resource/90/3355090_image2_1.png',
        title: '가회민화박물관',
        detail: '가회민화박물관은 우리의 소중한 문화유산을 일깨우기 위해 선조들의 삶과 지혜가 담겨 있는 민화와 부적을 좀 더 깊이 있게 연구하여 그 소중함을 일깨우고자 하는 데 설립 목적을 두고 있다.',
    },
    {
        placeId: 22,
        imgUrl: 'http://tong.visitkorea.or.kr/cms/resource/97/2739797_image2_1.jpg',
        title: '국립춘천박물관',
        detail: '국립춘천박물관은 강원특별자치도의 역사문화를 담은 복합문화공간으로, 강원 지역 문화의 원형과 특성을 찾고 이를 널리 알리기 위한 연구와 전시, 교육 및 다양한 문화 행사를 개최하고 있다.',
    },
]);

const carouselRef = ref(null);
const currentSlide = ref(0);

function moveSlide(direction) {
    if (!carouselRef.value) return;
    console.log('동작!!', direction);

    if (direction === 1) {
        carouselRef.value.next(); // 👉 다음 슬라이드로
    } else {
        carouselRef.value.prev(); // 👉 이전 슬라이드로
    }
}
</script>

<style scoped>
.main-carousel {
    width: 100%;
    height: 433px; /* or 원하는 배너 높이 */
    position: relative;
    overflow: hidden;
}

.carousel__slide {
    height: 100% !important;
}

.image-wrapper {
    position: relative;
    height: 433px;
    width: 100%;
    overflow: hidden;
}

.place-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50% !important; /* ✅ 세로 + 가로 정중앙 */
    display: block;
}

/* 오버레이 */
.overlay {
    position: absolute;
    color: white;
    text-align: center;
    padding: 20px;
}

.center-overlay {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* background: rgba(0, 0, 0, 0.4); */
    border-radius: 8px;
    min-width: 280px;
    max-width: 500px;
}

.overlay h2 {
    margin: 0;
    font-size: 2rem;
    font-weight: bold;
}

.overlay p {
    margin: 10px 0;
    font-size: 14px;
    word-break: keep-all;
}

.overlay-button {
    margin-top: 10px;
    background-color: #3478f6;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
}

.nav-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 3;
}

.nav-arrow.left {
    left: 16px;
}

.nav-arrow.right {
    right: 16px;
}

.arrow-icon {
    width: 36px;
    height: 36px;
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
}
</style>
