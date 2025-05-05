<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// 각 탭과 연결된 경로 정의
const tabs = [
    { label: '회원 정보 관리', path: '/mypage/userinfo' },
    { label: '구매내역', path: '/mypage/orderhistory' },
    { label: '배송지', path: '/mypage/deliveryaddress' },
    { label: 'MY관심', path: '/mypage/like' },
    { label: '리뷰 관리', path: '/mypage/review' },
    { label: '작성글 관리', path: '/mypage/post' },
];

// 이동 핸들러
function selectFilter(path) {
    router.push(path);
}
</script>

<template>
    <div style="margin-bottom: 103px">
        <div
            class="d-flex align-items-center"
            style="gap: 10px; margin-left: 33px; margin-bottom: 41px">
            <span style="font-size: 1.5rem; font-weight: 700"> 마이페이지 </span>
        </div>

        <div class="d-flex align-items-center justify-content-between border-bottom border-black">
            <div>
                <button
                    v-for="tab in tabs"
                    :key="tab.path"
                    class="filter-button"
                    :class="{ active: route.path.startsWith(tab.path) }"
                    @click="selectFilter(tab.path)">
                    {{ tab.label }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.filter-button {
    border: none;
    padding: 17px 46px;
    background-color: #fffdf8;
    font-size: 1.4rem;
    font-weight: 400;
}

.filter-button.active {
    font-weight: 700;
    border-bottom: 4px solid #000000;
}
</style>
