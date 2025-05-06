<script setup>
import { ref, reactive, onMounted } from 'vue';
import VerifyEmail from '../components/VerifyEmail.vue';
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';
import { findPassword, findPasswordEmailVerify } from '../api/user';
import { useToast } from 'vue-toastification';

const userInput = reactive({
    userId: null,
    email: null,
    verificationCode: null,
});

const router = useRouter();
const toast = useToast();

const modal = ref(null);
const modalElement = ref(null);

const sendEmail = async () => {
    try {
        // id 찾기 이메일 요청하기
        console.log('이메일 전송 완료', userInput.email);
        await findPassword({ userId: userInput.userId, email: userInput.email });
        return true;
    } catch (e) {
        toast.error(e.response.data.message);
        console.log('이메일 전송 에러', e);
        return false;
    }
};

const findFunction = async () => {
    try {
        // 임시 메일 전송 요청하기
        console.log(
            '임시 비밀번호 전송 완료',
            userInput.email,
            userInput.userId,
            userInput.verificationCode
        );

        await findPasswordEmailVerify({
            userId: userInput.userId,
            email: userInput.email,
            uuid: userInput.verificationCode,
        });

        modal.value.show();
    } catch (e) {
        toast.error(e.response.data.message);
    }
};

onMounted(() => {
    modal.value = new Modal(modalElement.value);
    modalElement.value.addEventListener('hidden.bs.modal', () => {
        router.replace('/login');
    });
});
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
            <VerifyEmail
                v-model:userInput="userInput"
                :sendEmail="sendEmail"
                :findFunction="findFunction" />
        </div>
    </div>
    <div
        ref="modalElement"
        class="modal fade"
        id="sendPasswordModal"
        tabindex="-1"
        aria-labelledby="sendPasswordLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="sendPasswordLabel">임시 비밀번호 발급 완료</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">임시 비밀번호가 입력하신 이메일로 전송되었습니다.</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        닫기
                    </button>
                </div>
            </div>
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
    margin-bottom: 16px;
}

.title {
    margin-bottom: 25px;
}

.title h1 {
    font-size: 2rem;
}

header {
    margin-bottom: 40px;
}
</style>
