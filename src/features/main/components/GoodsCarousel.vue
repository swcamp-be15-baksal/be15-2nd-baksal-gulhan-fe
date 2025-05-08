<script setup>
import { ref, onMounted } from 'vue';
import { Carousel, Pagination, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import { useRouter } from 'vue-router';
import { fetchGoodsList } from '@/features/goods/api.js';
import { useToast } from 'vue-toastification';

const goods = ref([]);
const router = useRouter();
const toast = useToast();

function goToGoods() {
    router.push('/goods');
}

function gotoGoodsDetail(param) {
    router.push(`/goods/${param}`);
}

onMounted(async () => {
    try {
        const res = await fetchGoodsList({ page: 1, size: 5 });
        goods.value = res.data.data.goods;
    } catch (err) {
        toast.error('기념품 불러오기 실패: ' + (err.response?.data?.message || err.message));
    }
});
</script>

<template>
    <div style="display: flex; flex-direction: column">
        <div class="header">
            <span style="font-size: 2.2rem; color: black; font-weight: 700">기념품</span>
            <button @click="goToGoods">+ 더보기</button>
        </div>
        <div class="wrapper">
            <Carousel :autoplay="3000" wrap-around="false">
                <Slide v-for="item in goods" :key="item.goodsId">
                    <div class="carousel__item">
                        <img
                            @click="gotoGoodsDetail(item.goodsId)"
                            class="slideImg"
                            :src="
                                item.firstImage ||
                                'https://d152i3f1t56z95.cloudfront.net/test/image.png'
                            " />
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
    width: 100%;
    color: white;
    display: flex;
    height: 480px;
    justify-content: center;
    object-fit: cover;
    align-items: center;
    cursor: pointer;
}

.slideImg {
    width: 100%;
    height: 480px;
    object-fit: cover;
}
.wrapper {
    width: 100%;
    margin: 0 auto;
}
</style>
