<script setup>
import editIcon from '@/assets/icons/edit.svg';
import deleteIcon from '@/assets/icons/delete.svg';
import RatingIcon from './RatingIcon.vue';

const rating = 4; // 예시 값임 나중에 값 가져올 거임

const stars = Array.from({ length: 5 }, (_, i) => i);
</script>

<template>
    <div>
        <div class="review-header">
            <div>윤*영</div>
            <div>
                <button class="edit-icon"><img :src="editIcon" alt="edit-icon" /></button>
                <button class="edit-icon"><img :src="deleteIcon" alt="delete-icon" /></button>
            </div>
        </div>
        <div class="rating-stars">
            <RatingIcon v-for="i in stars" :key="i" :fill="i < rating ? '#FFDC3E' : 'none'" />
        </div>
        <div class="review-text">
            생각보다 색상이 너무 누런데 생각했던 이미지랑 맞아서 잘 쓰고 있음. 친구들이 뭐 이런 걸
            쓰냐고 했지만 제 취향인 걸 어쩌겠나요? 근데 리뷰 쓰면 포인트 안 주나요? 얼른 평민
            탈출하고 싶음 ㅋ
        </div>
        <div class="upload-date">
            <span>2025.04.23</span>
            <!-- 수정일 -->
            <span>업로드</span>
            <!-- 수정일이랑 생성일 같으면 업로드? 다르면 수정일?-->
        </div>
    </div>
</template>

<style scoped>
.review-header {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.1rem;
    font-weight: 400;
    color: #9c9c9c;
}

.edit-icon {
    width: 38px;
    height: 38px;
    border: none;
    background-color: transparent;
}

.rating-stars {
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
    gap: 8px;
}

.review-text {
    margin-top: 14px;
    font-size: 1.1rem;
    color: black;
    line-height: 1.2;
    text-align: left;
}

.upload-date {
    margin-top: 8px;
    display: flex;
    justify-content: flex-end;
    color: #9c9c9c;
    font-size: 1.1rem;
    font-weight: 400;
    gap: 1px;
}
</style>
