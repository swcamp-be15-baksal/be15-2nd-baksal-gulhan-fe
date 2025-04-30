<script setup>
const { packages } = defineProps({
    packages: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <!-- <router-link class="item" :to="`/packages/${packages.packageId}`">
        <div class="package-detail">
            <p class="package-title">상품명: {{ packages.title }}</p>
            <p class="package-startDate">출발일: {{ packages.startDate }}</p>
            <p class="package-endDate">종료일: {{ packages.endDate }}</p>
            <p class="package-area">위치: {{ packages.area }}</p>
            <p class="package-price">상품 가격: {{ packages.price }}</p>
            <p class="package-likeCount">좋아요 수: {{ packages.likeCount }}</p>
            <p class="package-likeCount">리뷰뷰 수: {{ packages.reviewCount }}</p>
        </div>
    </router-link> -->

    <div class="package-detail">
        <p class="package-title">상품명: {{ packages.title }}</p>
        <p class="package-startDate">출발일: {{ packages.startDate }}</p>
        <p class="package-endDate">종료일: {{ packages.endDate }}</p>
        <p class="package-area">위치: {{ packages.area }}</p>
        <p class="package-price">상품 가격: {{ packages.price }}</p>
        <p class="package-likeCount">좋아요 수: {{ packages.likeCount }}</p>
        <p class="package-likeCount">리뷰뷰 수: {{ packages.reviewCount }}</p>
    </div>
</template>

<style scoped></style>
