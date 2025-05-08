<script setup>
import { ref, onMounted } from 'vue';
import filledHeartIcon from '@/assets/icons/heart-filled.svg';
import emptyHeartIcon from '@/assets/icons/heart-empty.svg';
import {
  checkLike,
  toggleLike,
  getTargetLikeCount,
} from '@/features/place/api.js';

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
  try {
    // ✅ 좋아요 여부 확인
    const [checkResponse, countResponse] = await Promise.all([
      checkLike(props.data.placeId, TARGET_TYPE),
      getTargetLikeCount({
        targetId: props.data.placeId,
        targetType: TARGET_TYPE,
      }),
    ]);

    isLiked.value = checkResponse.data.data === true;
    likeCount.value = countResponse.data.data;
  } catch (e) {
    console.error('좋아요 정보 초기화 실패:', e);
  }
});

const toggle = async () => {
  try {
    const response = await toggleLike(props.data.placeId, TARGET_TYPE);

    isLiked.value = response.data.liked;

    // ✅ 좋아요 수는 항상 서버에서 최신값으로 다시 가져오기
    const countResponse = await getTargetLikeCount({
      targetId: props.data.placeId,
      targetType: TARGET_TYPE,
    });
    likeCount.value = countResponse.data.data;
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
