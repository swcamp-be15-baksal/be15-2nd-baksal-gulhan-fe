<script setup>
import editIcon from '@/assets/edit.svg';
import deleteIcon from '@/assets/delete.svg';

const { packages } = defineProps({
    packages: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <!-- <div class="package-detail">
        <p class="package-title">상품명: {{ packages.packageTitle }}</p>
        <p class="package-startDate">출발일: {{ packages.packageStartDate }}</p>
        <p class="package-endDate">종료일: {{ packages.packageEndDate }}</p>
        <p class="package-area">위치: {{ packages.packageArea }}</p>
        <p class="package-price">상품 가격: {{ packages.packagePrice }}</p>
        <p class="package-likeCount">좋아요 수: {{ packages.likeCount }}</p>
        <p class="package-likeCount">리뷰뷰 수: {{ packages.reviewCount }}</p>
        <p class="package-remaining">잔여인원: {{ packages.packageRemaining }}</p>
        <p class="package-avgRating">평균별점: {{ packages.packageAvgRating }}</p>
        <p class="package-guidName">가이드: {{ packages.packageGuide }}</p>
        <p class="package-description">상품 설명: {{ packages.packageDetail }}</p>
    </div> -->
    <div class="d-flex justify-content-center">
        <div class="d-flex">
            <img src="https://placehold.co/555x416" alt="package-image" class="main-img" />
            <div>
                <div class="edit">
                    <button class="edit-icon"><img :src="editIcon" alt="edit-icon" /></button>
                    <button class="edit-icon"><img :src="deleteIcon" alt="delete-icon" /></button>
                </div>
                <div class="package-info"></div>
                <div class="price"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main-img {
    width: 555px;
    height: 416px;
    border-radius: 20px;
    object-fit: cover;
}

.edit-icon {
    border: none;
    background-color: transparent;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>
