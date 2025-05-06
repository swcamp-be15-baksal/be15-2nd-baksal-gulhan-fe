<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import MyPageHeader from '@/features/mypage/components/MyPageHeader.vue';

const router = useRouter();
const isVerified = ref(false);

// 테스트용, api 연동 후 수정
const userInfo = ref({
    id: 'lddocy',
    email: 'lddocy@baksal.com',
    name: '윤채영',
    phone: '010-1234-5678',
    birth: '2000.12.19',
    gender: '여자',
    address: '서울특별시 관악로17길 31',
});

// 마스킹된 정보 (비인증 상태에서만 사용)
const maskedInfo = computed(() => ({
    id: userInfo.value.id.slice(0, 2) + '****',
    email: userInfo.value.email.replace(/(.{2}).+(@.+)/, '$1****$2'),
    name: (() => {
        const name = userInfo.value.name;
        if (name.length === 2) {
            return name[0] + '*';
        } else if (name.length === 3) {
            return name[0] + '*' + name[2];
        } else if (name.length >= 4) {
            return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
        } else {
            return '*';
        }
    })(),
    phone: userInfo.value.phone.replace(/(\d{3})-(\d{4})-(\d{4})/, '$1-****-$3'),
    birth: userInfo.value.birth.replace(/\d{2}$/, '**'),
    gender: userInfo.value.gender,
    address: userInfo.value.address.replace(/^(.{9}).+/, '$1***'),
}));

function handleDelete() {
    const confirmed = confirm('정말 탈퇴 하시겠습니까?');
    if (confirmed) {
        console.log('탈퇴 처리');
    }
}
</script>

<template>
    <MyPageHeader />
    <div class="container">
        <h2 class="title">회원 정보 조회</h2>

        <form class="info-form">
            <input
                type="text"
                class="no-edit"
                :value="isVerified ? userInfo.id : maskedInfo.id"
                readonly />
            <input
                type="text"
                class="no-edit"
                :value="isVerified ? userInfo.email : maskedInfo.email"
                readonly />
            <input type="text" :value="isVerified ? userInfo.name : maskedInfo.name" readonly />
            <input type="text" :value="isVerified ? userInfo.phone : maskedInfo.phone" readonly />
            <input type="text" :value="isVerified ? userInfo.birth : maskedInfo.birth" readonly />
            <input type="text" :value="userInfo.gender" readonly />
            <input
                type="text"
                :value="isVerified ? userInfo.address : maskedInfo.address"
                readonly />
        </form>

        <button class="edit-button" @click="router.push(`/mypage/user/${userInfo.id}/edit`)">
            회원 정보 수정
        </button>
        <a href="#" class="delete-link" @click.prevent="handleDelete">회원탈퇴</a>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    justify-items: center;
}
.title {
    font-size: 1.75rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 40px;
}

.info-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
}

.info-form input {
    width: 440px;
    height: 56px;
    padding: 8px;
    border: 1px solid #3e4042;
    border-radius: 4px;
    background: white;
}

.no-edit {
    color: #a0a0a0;
}

.edit-button {
    width: 440px;
    height: 56px;
    background: #3e4042;
    color: white;
    border: none;
    border-radius: 4px;
    margin-top: 30px;
    margin-bottom: 15px;
    cursor: pointer;
}

.delete-link {
    display: block;
    text-align: center;
    color: #777777;
    text-decoration: underline;
    font-size: 16px;
    cursor: pointer;
}
</style>
