<script setup>
import editIcon from '@/assets/edit.svg';
import deleteIcon from '@/assets/delete.svg';
import heartIcon from '@/assets/heart.svg';
import starIcon from '@/assets/star.svg';

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
    categoryKey: {
        type: String,
        default: 'area',
    },
    showDate: {
        type: Boolean,
        default: true,
    },
    showGuide: {
        type: Boolean,
        default: true,
    },
});

function formatDate(ts) {
    if (!ts) return '';
    const date = new Date(ts);
    return date.toISOString().split('T')[0];
}
</script>

<template>
    <div v-if="data" class="d-flex justify-content-center">
        <div class="d-flex" style="gap: 47px">
            <img src="https://placehold.co/555x416" alt="data-image" class="main-img" />
            <div class="info-box d-flex flex-column">
                <div class="d-flex justify-content-end" style="position: relative; width: 353px">
                    <button class="edit-icon"><img :src="editIcon" alt="edit-icon" /></button>
                    <button class="edit-icon"><img :src="deleteIcon" alt="delete-icon" /></button>
                </div>
                <div class="data-info">
                    <button class="category" style="margin-bottom: 8px">
                        {{ data[categoryKey] }}
                    </button>
                    <div class="title">{{ data.title }}</div>
                    <div class="title" v-if="showDate">
                        {{ formatDate(data.startDate) }} ~ {{ formatDate(data.endDate) }}
                    </div>
                    <div v-if="showGuide" style="font-size: 1.4rem; font-weight: 400">
                        {{ data.guideName }} 가이드
                    </div>
                    <div class="like-review" style="margin-top: 16px">
                        <img :src="heartIcon" style="margin-left: 6px; margin-right: 6px" />
                        <span style="color: #ff268f">{{ data.likeCount }}</span>
                    </div>
                    <div class="like-review" style="margin-bottom: 16px">
                        <img :src="starIcon" />
                        <span style="color: #ffdc3e">{{ data.avgRating }}</span>
                    </div>
                    <div style="font-size: 1.3rem; color: #adadad; font-weight: 400">
                        잔여수량 {{ data.remaining }}
                    </div>
                </div>
                <div class="price">{{ data.price.toLocaleString() }}원</div>
                <div class="buy-button">
                    <button style="background-color: #2c2c2c">장바구니 담기</button>
                    <button style="background-color: #e57575">결제하기</button>
                </div>
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
    padding: 4px 12px;
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
    height: 416px;
    position: relative;
}
.price {
    position: absolute;
    bottom: 60px;
    right: 0;
    font-size: 1.6rem;
    font-weight: 700;
}
.buy-button {
    width: 100%;
    position: absolute;
    bottom: 0;
    gap: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.buy-button button {
    width: 100%;
    height: 54px;
    font-size: 1.3rem;
    font-weight: 400;
    color: white;
    border: none;
    border-radius: 8px;
}
</style>
