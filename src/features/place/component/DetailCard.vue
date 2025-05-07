<script setup>
import { ref, onMounted, computed } from 'vue';
import filledHeartIcon from '@/assets/icons/heart-filled.svg';
import emptyHeartIcon from '@/assets/icons/heart-empty.svg';
import { checkLike, getLike, toggleLike } from '@/features/place/api.js'; // 추가

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

const isLiked = ref(false);
const likeCount = ref(0);

const TARGET_TYPE = 'PLACE';

onMounted(async () => {
  likeCount.value = props.data.likeCount || 0;

  try {
    const response = await checkLike({
      targetId: props.data.placeId,
      targetType: TARGET_TYPE,
    });
    isLiked.value = response.data.data === true;
  } catch (e) {
    console.error('좋아요 상태 확인 실패', e);
  }
});

const toggle = async () => {
  try {
    const response = await toggleLike({
      targetId: props.data.placeId,
      targetType: TARGET_TYPE,
    });
    isLiked.value = response.data.liked;
    likeCount.value = isLiked.value
      ? likeCount.value + 1
      : Math.max(0, likeCount.value - 1);
  } catch (e) {
    console.error('좋아요 토글 실패', e);
  }
};
</script>

<template>
  <div class="wrapper">
    <img
      :src="props.data.image || 'https://placehold.co/1166x421'"
      alt="data-image"
      class="main-img"
    />

    <div class="info-top">
      <div class="title-address">
        <div class="title">{{ props.data.title }}</div>
        <div class="address">{{ props.data.address }}</div>
      </div>
      <div class="like" @click="toggle">
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
