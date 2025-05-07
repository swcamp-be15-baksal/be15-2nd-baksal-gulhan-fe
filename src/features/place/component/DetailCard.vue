<script setup>
import { ref, onMounted } from 'vue';
import filledHeartIcon from '@/assets/icons/heart-filled.svg'; // 채워진 하트
import emptyHeartIcon from '@/assets/icons/heart-empty.svg';   // 빈 하트

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  categoryKey: {
    type: String,
    default: 'category',
  },
});

// 좋아요 상태 및 수 초기화
const isLiked = ref(false);
const likeCount = ref(0);

onMounted(() => {
  isLiked.value = props.data.isLiked || false;
  likeCount.value = props.data.likeCount || 0;
});

// 토글 기능
const toggleLike = () => {
  isLiked.value = !isLiked.value;
  likeCount.value = isLiked.value
    ? likeCount.value + 1
    : Math.max(0, likeCount.value - 1);
};
</script>

<template>
  <div v-if="props.data" class="wrapper">
    <img
      src="https://placehold.co/1166x421"
      alt="data-image"
      class="main-img"
    />

    <div class="info-top">
      <div class="title-address">
        <div class="title">{{ props.data.title }}</div>
        <div class="address">{{ props.data.address }}</div>
      </div>
      <div class="like" @click="toggleLike">
        <img :src="isLiked ? filledHeartIcon : emptyHeartIcon" alt="like" />
        <span>{{ likeCount }}</span>
      </div>
    </div>

    <div class="info-bottom">
      <div class="rest-date">
        <div class="label">휴일</div>
        <div class="value">{{ props.data.restDate }}</div>
      </div>
      <div class="detail">{{ props.data.detail }}</div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 19px;
}

.main-img {
  width: 1166px;
  height: 421px;
  border-radius: 20px;
  object-fit: cover;
}

.info-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1166px;
  gap: 19px;
}

.title-address {
  display: flex;
  align-items: baseline;
  gap: 16px;
}

.title {
  font-size: 1.875rem;
  font-weight: 700;
}

.address {
  font-size: 1.125rem;
  color: #666;
}

.like {
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  color: #ff268f;
  gap: 8px;
  cursor: pointer;
}

.info-bottom {
  display: flex;
  gap: 20px;
  width: 1166px;
  align-items: flex-start;
}

.rest-date {
  font-size: 1.25rem;
  width: 180px;
}

.label {
  font-size: 1.406rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.detail {
  max-width: 800px;
  flex: 1;
  font-size: 1.25rem;
  line-height: 1.6;
  border-left: 1px solid #ccc;
  padding-left: 30px;
  text-align: left;
}
</style>
