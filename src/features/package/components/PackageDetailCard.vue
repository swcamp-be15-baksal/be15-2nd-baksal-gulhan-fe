<script setup>
import editIcon from '@/assets/edit.svg';
import deleteIcon from '@/assets/delete.svg';
import heartIcon from '@/assets/heart.svg';
import starIcon from '@/assets/star.svg';

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
        <div class="d-flex" style="gap: 47px">
            <img src="https://placehold.co/555x416" alt="package-image" class="main-img" />
            <div class="info-box d-flex flex-column">
                <div class="d-flex justify-content-end" style="position: relative; width: 353px">
                    <button class="edit-icon"><img :src="editIcon" alt="edit-icon" /></button>
                    <button class="edit-icon"><img :src="deleteIcon" alt="delete-icon" /></button>
                </div>
                <div class="package-info">
                    <button class="category" style="margin-bottom: 18px">충청남도 부여군</button>
                    <div class="title">백제문화단지 역사여행</div>
                    <div class="title">2025/04/15</div>
                    <div style="font-size: 1.4rem; font-weight: 400">김철수 가이드</div>
                    <div class="like-review" style="margin-top: 40px">
                        <img :src="heartIcon" style="margin-left: 6px; margin-right: 6px" />
                        <span style="color: #ff268f">805</span>
                        <span style="color: #adadad">(21)</span>
                    </div>
                    <div class="like-review" style="margin-bottom: 40px">
                        <img :src="starIcon" />
                        <span style="color: #ffdc3e">4.3</span>
                    </div>
                    <div style="font-size: 1.3rem; color: #adadad; font-weight: 400">
                        잔여인원 3명
                    </div>
                </div>
                <div class="price">79,000원</div>
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

.category {
    border: none;
    background-color: #2c2c2c;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 400;
    color: white;
    height: 32px;
    width: 132px;
}

.title {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.2;
}

.like-review {
    display: flex;
    font-size: 1.4rem;
    gap: 5px;
    align-items: center;
}

.info-box {
    height: 416px; /* 이미지 높이와 동일하게 고정! */
    position: relative;
}

.price {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 1.6rem;
    font-weight: 700;
}
</style>
