<script setup>
import { computed } from 'vue';
import editIcon from '@/assets/icons/edit.svg';
import deleteIcon from '@/assets/icons/delete.svg';
import RatingIcon from './RatingIcon.vue';

const stars = Array.from({ length: 5 }, (_, i) => i);

const props = defineProps({
    review: {
        type: Object,
        required: true,
    },
    showName: {
        type: Boolean,
        default: true,
    },
});
const rating = props.review.rating;

const createdAt = new Date(props.review.createdAt);
const updatedAt = new Date(props.review.updatedAt);

const displayDateInfo = computed(() => {
    const dateToShow = updatedAt.getTime() > createdAt.getTime() ? updatedAt : createdAt;
    const label = updatedAt.getTime() > createdAt.getTime() ? '수정' : '작성';

    const formattedDate = dateToShow.toISOString().split('T')[0].replace(/-/g, '.');
    return { formattedDate, label };
});
</script>

<template>
    <div>
        <div class="review-header">
            <!-- 이거 나중에는 userNo의 이름으로 불러와야 됨 -->
            <div v-if="!showName"></div>
            <div v-if="showName">익명의 유저 {{ review.userNo }}</div>
            <div>
                <button class="edit-icon"><img :src="editIcon" alt="edit-icon" /></button>
                <button class="edit-icon"><img :src="deleteIcon" alt="delete-icon" /></button>
            </div>
        </div>
        <div class="rating-stars">
            <RatingIcon v-for="i in stars" :key="i" :fill="i < rating ? '#FFDC3E' : 'none'" />
        </div>
        <div class="review-text">
            {{ review.detail }}
        </div>
        <div class="upload-date" style="gap: 4px">
            <span>{{ displayDateInfo.formattedDate }} </span>
            <span>{{ displayDateInfo.label }}</span>
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
