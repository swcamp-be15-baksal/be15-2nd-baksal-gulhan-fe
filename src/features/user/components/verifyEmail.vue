<script setup>
import { computed, ref } from 'vue';
import userValid from '../validator/userValid';

const userInput = defineModel('userInput');
const props = defineProps({
    sendEmail: {
        type: Function,
    },
    findId: {
        type: Function,
    },
});

function formatTime(seconds) {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${minutes}:${secs}`;
}

const resendTimer = ref(0);
const verifyTimer = ref(0);

const resendIntervalId = ref(null);
const verifyIntervalId = ref(null);
const isSendEmail = ref(false);

const isButtonDisabled = computed(() => resendTimer.value > 0 || !isEmailValid.value);
const isEmailValid = computed(() => userValid.validateEmail(userInput.value.email));

const clickSendEmail = async () => {
    // 인증번호 전송
    if (typeof props.sendEmail === 'function') {
        await props.sendEmail();
        isSendEmail.value = true;
    }

    // 타이머 초기화
    resendTimer.value = 15; // 재전송
    verifyTimer.value = 60 * 10; // 인증

    // 타이머 시작
    // 재전송
    resendIntervalId.value = setInterval(() => {
        resendTimer.value -= 1;
        if (resendTimer.value <= 0) {
            clearInterval(resendIntervalId.value);
        }
    }, 1000);

    // 인증
    verifyIntervalId.value = setInterval(() => {
        verifyTimer.value -= 1;
        if (verifyTimer.value <= 0) {
            clearInterval(verifyIntervalId.value);
        }
    }, 1000);
};

const findId = async () => {
    if (typeof props.findId === 'function') {
        await props.findId();
    }
};

const formattedResendTime = computed(() => formatTime(resendTimer.value));
const formattedVerifyTime = computed(() => formatTime(verifyTimer.value));
</script>

<template>
    <div class="email-section">
        <div class="email-input">
            <input
                id="email"
                type="text"
                placeholder="이메일을 입력해주세요"
                v-model="userInput.email" />
            <button class="send-email" :disabled="isButtonDisabled" @click="clickSendEmail">
                {{ resendTimer > 0 ? `${formattedResendTime}` : '인증 요청' }}
            </button>
        </div>
        <p v-if="userInput.email && !isEmailValid">✖ 올바르지 않은 이메일 형식입니다</p>
    </div>
    <div v-if="isSendEmail" class="verify-section">
        <div class="timer-box">
            <p>{{ formattedVerifyTime }}</p>
        </div>
        <input
            id="code"
            type="text"
            v-model="userInput.verificationCode"
            placeholder="인증번호를 입력해주세요" />
    </div>
    <button v-if="isSendEmail" type="submit" @click="findId">인증하기</button>
</template>

<style scoped>
@import '@/features/user/user.css';

.email-section {
    /* display: flex; */
    /* gap: 12px; */
    margin-bottom: 16px;
}

.email-input {
    display: flex;
    gap: 12px;
}

.verify-section {
    display: flex;
    margin-bottom: 16px;
}

input[id='email'] {
    width: 80%;
    padding: 12px;
    border: 1px solid #aaa;
    border-radius: 6px;
    font-size: 1rem;
    margin-bottom: 8px;
}

.send-email {
    min-width: 80px;
    background-color: #75a9ff;
    color: #ffffff;
}

input[id='code'] {
    width: 100%;
    padding: 12px;
    border: 1px solid #aaa;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    font-size: 1rem;
    margin-bottom: 8px;
}

input:focus {
    outline: none;
    box-shadow: none;
    border: 1px solid #aaa; /* 선택적으로 원하는 테두리 유지 */
}

button {
    width: 20%;
    font-size: 1rem;
}

button:disabled {
    background-color: #a0a0a0;
    color: #ffffff;
    cursor: not-allowed;
    pointer-events: none; /* 🚫 hover, click 막기 */
    filter: none !important; /* 혹시 기존 hover 스타일 덮어쓰기 */
}

.email-section p {
    color: #e94f4f;
    font-size: 0.8rem;
}
.timer-box {
    width: 80px;
    height: auto;
    margin-bottom: 8px;
    background-color: #e57575;
    border: #e57575;
    text-align: center;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.timer-box p {
    color: white;
    font-size: 0.95rem;
    margin: 0;
}

button[type='submit'] {
    background-color: #3e4042;
    color: #ededed;
    width: 100%;
}
</style>
