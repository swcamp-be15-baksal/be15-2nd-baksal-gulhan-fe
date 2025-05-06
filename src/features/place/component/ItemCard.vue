<script setup>
import { ref, onMounted } from 'vue';
import filledHeartIcon from '@/assets/icons/heart-filled.svg';
import emptyHeartIcon from '@/assets/icons/heart-empty.svg';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  linkPrefix: {
    type: String,
    default: '/place',
  },
  idKey: {
    type: String,
    default: 'placeId',
  },
  categoryKey: {
    type: String,
    default: 'category',
  },
});

const isLiked = ref(false);
const likeCount = ref(0);

onMounted(() => {
  isLiked.value = props.data.isLiked || false;
  likeCount.value = props.data.likeCount || 0;
});

const toggleLike = (event) => {
  event.stopPropagation();
  event.preventDefault();

  isLiked.value = !isLiked.value;
  likeCount.value = isLiked.value
    ? likeCount.value + 1
    : Math.max(0, likeCount.value - 1);
  // TODO: API 호출
};
</script>

<template>
  <div class="card">
    <router-link :to="`${linkPrefix}/${props.data[idKey]}`" class="card-link">
      <div class="data-img">
        <img
          :src="props.data.image || 'https://d152i3f1t56z95.cloudfront.net/test/image.png'"
          alt="place image"
        />
        <div class="category-label">{{ props.data[categoryKey] }}</div>
      </div>
      <div class="card-content">
        <div class="main-info">{{ props.data.title }}</div>
        <div class="address">{{ props.data.address }}</div>
        <div class="card-bottom">
          <img :src="isLiked ? filledHeartIcon : emptyHeartIcon" alt="like" class="heart-icon" @click="toggleLike" />
          <span class="like-count">{{ likeCount }}</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.card {
  background-color: #fffdf8;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.card-link {
  display: block;
  color: inherit;
  text-decoration: none;
}
.data-img img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 20px 20px 0 0;
}
.category-label {
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: #3e4042;
  border-radius: 8px;
  padding: 4px 8px;
  font-size: 0.9rem;
  color: #fff;
  white-space: nowrap;
}
.card-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.main-info {
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
}
.address {
  font-size: 1.2rem;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card-bottom {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}
.heart-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.like-count {
  font-size: 1.4rem;
  color: #ff268f;
}
</style>
