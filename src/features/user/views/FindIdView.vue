<script setup>
import { ref, reactive } from 'vue';
import ShowUserId from '../components/ShowUserId.vue';
import VerifyEmail from '../components/VerifyEmail.vue';
import { findId, findIdEmailVerify } from '../api/user';
import { useToast } from 'vue-toastification';

const userInput = reactive({
    email: null,
    verificationCode: null,
});

const toast = useToast();

const maskedId = ref(null);

const sendEmail = async () => {
    try {
        // id 찾기 이메일 요청하기
        console.log('아이디 찾기 이메일 전송 완료', userInput.email);
        const response = await findId({ email: userInput.email });
        console.log(response);
    } catch (e) {
        toast.error(e.response);
        console.log('이메일 전송 에러', e);
    }
};

const findFunction = async () => {
    try {
        userInput.verificationCode = userInput.verificationCode.trim();
        if (userInput.verificationCode === null || userInput.verificationCode === '') {
            toast.error('인증번호가 유효하지 않습니다.');
            return;
        }

        const response = await findIdEmailVerify({
            uuid: userInput.verificationCode,
        });
        maskedId.value = response.data.data.maskedUserId;
    } catch (e) {
        toast.error(e.response.data.message);
    }
};
</script>
<template>
    <div class="container">
        <header v-if="maskedId === null">
            <div class="title">
                <h1>아이디 찾기</h1>
            </div>
            <div class="sub-title">
                <p>이메일 인증을 통해 아이디를 찾습니다.</p>
            </div>
        </header>
        <div class="content">
            <VerifyEmail
                v-if="maskedId === null"
                v-model:userInput="userInput"
                :sendEmail="sendEmail"
                :findFunction="findFunction" />
            <ShowUserId v-if="maskedId !== null" :maskedId="maskedId" />
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

.title {
    margin-bottom: 25px;
}

header {
    margin-bottom: 40px;
}
</style>
