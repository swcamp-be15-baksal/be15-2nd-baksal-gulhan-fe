<script setup>
import { ref } from 'vue';

const notices = ref([
    {
        noticeId: 1,
        title: '문화유산 보호를 위한 방문객 행동 지침',
        userId: 'admin1',
        createdAt: '2025.04.22',
    },
    {
        noticeId: 2,
        title: '전국 역사 여행지 할인 프로모션 안내',
        userId: 'admin1',
        createdAt: '2025.04.22',
    },
    {
        noticeId: 3,
        title: '고대 유적지 탐방 일정 변경 안내',
        userId: 'admin2',
        createdAt: '2025.04.22',
    },
    {
        noticeId: 4,
        title: '새로운 역사 기념품 라인업 출시!',
        userId: 'admin2',
        createdAt: '2025.04.22',
    },
    {
        noticeId: 5,
        title: '2025년 역사 여행 시즌 특별 이벤트 안내',
        userId: 'admin1',
        createdAt: '2025.04.22',
    },
]);
</script>

<template>
    <div style="display: flex; flex-direction: column">
        <div style="font-size: 2.2rem; color: black; font-weight: 700; margin: 20px 0px">
            공지사항
        </div>
        <table class="notice-table">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>ID</th>
                    <th>작성일</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="notice in notices" :key="notice.noticeId">
                    <td>{{ notice.noticeId }}</td>
                    <td>{{ notice.title }}</td>
                    <td>{{ notice.userId }}</td>
                    <td>{{ notice.createdAt }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.notice-table {
    width: 100%;
    border-collapse: collapse;
    border-top: 2px solid #aaa;
    table-layout: fixed;
    margin: 0 auto;
}
.notice-table th,
.notice-table td {
    padding: 14px 10px;
    border-bottom: 1px solid #e5e5e5;
    text-align: center;
    font-size: 1.2rem;
    word-break: break-word;
}
/* 열 너비 비율 조정 */
.notice-table th:nth-child(1),
.notice-table td:nth-child(1) {
    width: 8%;
}
.notice-table th:nth-child(2),
.notice-table td:nth-child(2) {
    width: 60%;
}
.notice-table th:nth-child(3),
.notice-table td:nth-child(3) {
    width: 17%;
}
.notice-table th:nth-child(4),
.notice-table td:nth-child(4) {
    width: 15%;
}
</style>
