<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ReviewList from '@/features/review/components/ReviewList.vue';
import { fetchReviews } from '@/features/review/api.js';

const props = defineProps({
    detail: {
        type: String,
        default: '',
    },
    reviewCount: {
        type: Number,
        default: 0,
    },
    showReview: {
        type: Boolean,
        default: true,
    },
});

const activeTab = ref('detail');
const reviews = ref([]);
const route = useRoute();

const targetType = computed(() => {
    if (route.path.startsWith('/packages/')) return 'PACKAGE';
    if (route.path.startsWith('/goods/')) return 'GOODS';
    return null;
});
const targetId = computed(() => Number(route.params.id));

onMounted(async () => {
    try {
        const res = await fetchReviews(targetType.value, targetId.value);
        reviews.value = res.data.review;
    } catch (err) {
        console.error('[리뷰 조회 실패]', err);
    }
});
</script>

<template>
    <div style="margin-top: 124px"></div>
    <div class="page-wrapper">
        <div class="main-wrapper">
            <div class="d-flex tab-wrapper">
                <button
                    class="tab-button"
                    :style="
                        activeTab === 'detail'
                            ? 'background-color:#2C2C2C'
                            : 'background-color: #e6e6e6'
                    "
                    @click="activeTab = 'detail'">
                    상세 정보
                </button>
                <button
                    v-if="showReview"
                    class="tab-button"
                    :style="
                        activeTab === 'review'
                            ? 'background-color:#2C2C2C'
                            : 'background-color: #e6e6e6'
                    "
                    @click="activeTab = 'review'">
                    리뷰 ({{ reviews.length }})
                </button>
            </div>

            <div class="main">
                <div v-if="activeTab === 'detail'">
                    {{ detail }}
                </div>
                <div v-else>
                    <template v-if="reviews.length > 0">
                        <ReviewList :reviews="reviews" />
                    </template>
                    <template v-else>
                        <div style="text-align: center; color: gray">
                            아직 작성된 리뷰가 없습니다.
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}
.main-wrapper {
    position: relative;
    width: 100%;
    max-width: 927px;
}
.tab-wrapper {
    position: absolute;
    top: -50px;
    left: 32px;
    display: flex;
    gap: 10px;
    z-index: 1;
}
.tab-button {
    font-size: 1.6rem;
    font-weight: 700;
    color: white;
    padding: 0.5rem 1rem;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border: none;
}
.main {
    position: relative;
    max-width: 927px;
    background-color: white;
    border-radius: 20px;
    border: 1px solid #d9d9d9;
    padding: 52px 44px;
    font-size: 1.1rem;
    color: black;
    font-weight: 400;
    white-space: pre-wrap;
    text-align: center;
    margin: 0 auto;
    line-height: 1.6;
    z-index: 10;
}
</style>
