<script setup>
import ReviewItem from '@/features/review/components/ReviewItem.vue';
import { ref } from 'vue';
const activeTab = ref('detail');
const props = defineProps({
    packages: Object,
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
                    class="tab-button"
                    :style="
                        activeTab === 'review'
                            ? 'background-color:#2C2C2C'
                            : 'background-color: #e6e6e6'
                    "
                    @click="activeTab = 'review'">
                    리뷰
                    <!-- 여기에 개수 적는 게 맞을 듯-->
                </button>
            </div>
            <div class="main">
                <div v-if="activeTab === 'detail'">
                    {{ packages.detail }}
                </div>
                <div v-else><ReviewItem /></div>
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
    /* 나중에 텍스트 에디터로 받으면 위 설정은 필요 없음 
    const container = document.querySelector('.detail-text');
    container.innerHTML = quill.getContents(); // 또는 저장된 HTML */
    text-align: center;
    margin: 0 atuo;
    line-height: 1.6;
    z-index: 10;
}
</style>
