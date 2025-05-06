<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    noticeList: {
        type: Array,
        required: true,
    },
});

const router = useRouter();

const notices = ref([]);

watch(
    () => props.noticeList,
    (newList) => {
        notices.value = [...newList];
    },
    { immediate: true }
);
console.log(notices.value);

const onClickNotice = (noticeId) => {
    router.push(`/notice/${noticeId}`);
};
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
                <tr
                    v-for="notice in props.noticeList"
                    :key="notice.noticeId"
                    @click="onClickNotice(notice.noticeId)">
                    <td>{{ notice.noticeId }}</td>
                    <td>{{ notice.title }}</td>
                    <td>{{ notice.userId }}</td>
                    <td>{{ notice.createdAt.split(' ')[0] }}</td>
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

.notice-table tbody tr{
  cursor: pointer;
}
  /* 열 너비 비율 조정 */
.notice-table th:nth-child(1),
.notice-table td:nth-child(1) {
    width: 10%;
}

.notice-table th:nth-child(2),
.notice-table td:nth-child(2) {
    width: 50%;
}

.notice-table th:nth-child(3),
.notice-table td:nth-child(3) {
    width: 17%;
}

.notice-table th:nth-child(4),
.notice-table td:nth-child(4) {
    width: 18%;
}

.notice-table td:nth-child(4) {
    font-size: 1rem;
}

.notice-table td:nth-child(2) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
