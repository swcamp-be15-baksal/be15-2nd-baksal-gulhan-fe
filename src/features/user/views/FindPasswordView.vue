<script setup>
import { ref, reactive } from 'vue';
import VerifyEmail from '../components/VerifyEmail.vue';

const userInput = reactive({
    userId: null,
    email: null,
    verificationCode: null,
});

const sendEmail = async () => {
    try {
        // id 찾기 이메일 요청하기
        console.log('아이디 찾기 이메일 전송 완료', userInput.email);
    } catch (e) {
        console.log('이메일 전송 에러', e);
    }
};
</script>
<template>
    <div class="container">
        <header>
            <div class="title">
                <h1>비밀번호 찾기</h1>
            </div>
            <div class="sub-title">
                <p>이메일 인증을 통해 임시 비밀번호를 발급 받습니다.</p>
            </div>
        </header>
        <div class="content">
            <input
                type="text"
                id="userId"
                placeholder="아이디를 입력해주세요"
                v-model="userInput.userId" />
            <VerifyEmail v-model:userInput="userInput" :sendEmail="sendEmail" />
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 600px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: left;
}

input[id='userId'] {
    width: 100%;
    padding: 12px;
    border: 1px solid #aaa;
    border-radius: 6px;
    font-size: 1rem;
    margin-bottom: 8px;
}
</style>
