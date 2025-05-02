<script setup>
import SignupStatus from '@/features/user/components/SignupStatus.vue';
import userValid from '../validator/userValid';

import { ref, computed, nextTick, watch } from 'vue';

const emit = defineEmits(['nextStep']);
const signupData = defineModel('signupData');

function nextStep() {
    emit('nextStep');
}

const popupWidth = 500;
const popupHeight = 600;


const phone1 = ref('');
const phone2 = ref('');
const phone3 = ref('');

watch([phone1, phone2, phone3], () => {
    signupData.value.phone = `${phone1.value}-${phone2.value}-${phone3.value}`;
});
const isUserIdValid = computed(() => signupData.value.userId?.length >= 5);
const isPasswordMatch = computed(
    () => signupData.value.password === signupData.value.confirmPassword
);
const passwordLengthValid = computed(() => signupData.value.password?.length >= 8);
const passwordLowerValid = computed(() => /[a-z]/.test(signupData.value.password || ''));
const passwordUpperValid = computed(() => /[A-Z]/.test(signupData.value.password));
const passwordNumberValid = computed(() => /[0-9]/.test(signupData.value.password));
const passwordSpecialValid = computed(() => /[^A-Za-z0-9]/.test(signupData.value.password));

const isPasswordValid = computed(
    () =>
        passwordLengthValid.value &&
        passwordLowerValid.value &&
        passwordUpperValid.value &&
        passwordNumberValid.value &&
        passwordSpecialValid.value
);

const userIdLengthValid = computed(() => signupData.value.userId?.length >= 5);
const userIdStartValid = computed(() => /^[a-z]/.test(signupData.value.userId || ''));
const isEmailValid = computed(() => userValid.validateEmail(signupData.value.email)
);

const isFormValid = computed(() =>
  isUserIdValid.value === true &&
  isPasswordValid.value === true &&
  isPasswordMatch.value === true &&
  isEmailValid.value === true &&
  !!signupData.value.name?.trim() &&
  !!signupData.value.email?.trim() &&
  !!signupData.value.phone?.trim() &&
  !!signupData.value.birth?.trim() &&
  !!signupData.value.gender?.trim() &&
  !!signupData.value.address?.trim()
);

function openPostcodeSearch() {
    new daum.Postcode({
        oncomplete: function (data) {
            const selectedAddress = data.roadAddress || data.jibunAddress;
            signupData.value.address = selectedAddress;
            nextTick(() => {
                const detailInput = document.getElementById('detailAddress');
                detailInput?.focus();
                window.close();
            });
        },
    }).open({
        left: (window.screen.width / 2) - (popupWidth / 2),
        top: (window.screen.height / 2) - (popupHeight / 2)
    });
}

const onClickSignup = async () => {
    try {
        if(!isFormValid.value){
            throw Error("입력 값이 잘못 되었습니다.")
        }
        const payload = {
            userId: signupData.value.userId,
            password: signupData.value.password,
            confirmPassword: signupData.value.confirmPassword,
            name: signupData.value.name,
            email: signupData.value.email,
            phone: signupData.value.phone,
            birth: signupData.value.birth,
            gender: signupData.value.gender,
            address: signupData.value.address,
            detailAddress: signupData.value.detailAddress,
            agreed: signupData.value.agreed,
        };

        console.log('회원가입 데이터 전송:', JSON.stringify(payload));

        // TODO: API 연동 로직 삽입

        nextStep();
    } catch (e) {
        alert('회원가입 중 오류가 발생했습니다: ' + e);
    }
};
</script>

<template>
    <div class="container">
        <div class="inner-title">
            <h1>회원 가입</h1>
        </div>
        <SignupStatus :step="2" />

        <div class="form-wrapper">
            <div class="input-box">
                <input v-model="signupData.userId" placeholder="아이디" />
                <ul class="validation-list">
                    <li :class="{ passed: userIdLengthValid }">✔ 5자 이상</li>
                    <li :class="{ passed: userIdStartValid }">✔ 소문자 시작</li>
                </ul>
            </div>

            <div class="input-box">
                <input type="password" v-model="signupData.password" placeholder="비밀번호" />
                <ul class="validation-list">
                    <li :class="{ passed: passwordLengthValid }">✔ 8자 이상</li>
                    <li :class="{ passed: passwordLowerValid }">✔ 소문자 포함</li>
                    <li :class="{ passed: passwordUpperValid }">✔ 대문자 포함</li>
                    <li :class="{ passed: passwordNumberValid }">✔ 숫자 포함</li>
                    <li :class="{ passed: passwordSpecialValid }">✔ 특수문자 포함</li>
                </ul>
            </div>

            <div class="input-box">
                <input
                    type="password"
                    v-model="signupData.confirmPassword"
                    placeholder="비밀번호 확인" />
                <p v-if="signupData.confirmPassword && !isPasswordMatch">✖ 비밀번호가 다릅니다</p>
            </div>

            <div class="input-box">
                <input v-model="signupData.name" placeholder="이름" />
            </div>

            <div class="input-box">
                <input v-model="signupData.email" placeholder="이메일" />
                <p v-if="signupData.email && !isEmailValid">✖ 올바르지 않은 이메일 형식입니다</p>
            </div>

            <div class="input-box phone-box">
                <div class="phone-inputs">
                    <input class="short" v-model="phone1" maxlength="3" placeholder="010" />
                    <input class="long" v-model="phone2" maxlength="4" placeholder="1234" />
                    <input class="long" v-model="phone3" maxlength="4" placeholder="5678" />
                </div>
            </div>

            <div class="input-box">
                <input v-model="signupData.birth" placeholder="생년월일 8자리" />
            </div>

            <div class="gender-buttons">
                <button
                    :class="{ active: signupData.gender === 'M' }"
                    @click="signupData.gender = 'M'">
                    남자
                </button>
                <button
                    :class="{ active: signupData.gender === 'F' }"
                    @click="signupData.gender = 'F'">
                    여자
                </button>
            </div>

            <div class="input-row">
                <input v-model="signupData.address" placeholder="주소" readonly />
                <button class="search-btn" @click="openPostcodeSearch">검색</button>
            </div>

            <div class="input-box">
                <input id="detailAddress" v-model="signupData.detailAddress" placeholder="상세 주소" />
            </div>

            <button class="submit" :disabled="!isFormValid" @click="onClickSignup">회원가입</button>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 440px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fffdf8;
}

.inner-title {
    margin-bottom: 26px;
}

.inner-title h1 {
    font-size: 2rem;
    font-weight: bolder;
    color: #232527;
}

.form-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
}

.input-box {
    position: relative;
    display: flex;
    flex-direction: column;
}

.input-box input {
    width: 100%;
    padding: 12px;
    border: 1px solid #aaa;
    border-radius: 6px;
    font-size: 1rem;
}

.input-box button {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 1rem;
    cursor: pointer;
}

.input-box p {
    font-size: 0.75rem;
    margin-top: 4px;
    color: #666;
}

.gender-buttons {
    display: flex;
    gap: 8px;
    margin-top: 8px;
}

.gender-buttons button {
    flex: 1;
    padding: 8px;
    border: 1px solid #999;
    border-radius: 4px;
    background-color: #e0e0e0;
    cursor: pointer;
}

.gender-buttons button.active {
    background-color: #a5a872;
    color: white;
}

.input-row {
    display: flex;
    gap: 8px;
    width: 100%;
}

.validation-list {
    display: flex;
    justify-content: left;
    gap: 4%;
    list-style: none;
    padding: 0;
    margin: 8px 0;
}

.validation-list li {
    text-align: left;
    font-size: 0.75rem;
    color: #888;
}

/* 조건 만족 시 */
.validation-list li.passed {
    color: #232527;
    font-weight: bold;
}

.input-box p {
    color: #e57575;
}

.input-row input {
    flex: 1;
    padding: 12px;
    border: 1px solid #aaa;
    border-radius: 6px;
    font-size: 1rem;
}

.search-btn {
    padding: 0 16px;
    background-color: #75a9ff;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    color: #ededed;
    cursor: pointer;
    white-space: nowrap;
}

.search-btn:hover {
    filter: brightness(95%);
}

.search-btn:active {
    filter: brightness(90%);
}

.gender-buttons {
    display: flex;
    gap: 8px;
    width: 100%;
}

.gender-buttons button {
    flex: 1;
    padding: 10px 0;
    border: 1px solid #999;
    border-radius: 4px;
    background-color: #ffffff;
    cursor: pointer;
    font-size: 1rem;
}

.gender-buttons button:hover {
    filter: brightness(95%);
}

.gender-buttons button:active {
    filter: brightness(90%);
}

.gender-buttons button.active {
    background-color: #a5a872;
    color: white;
}

.phone-inputs {
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;
}

.phone-inputs input {
    padding: 10px;
    border: 1px solid #aaa;
    border-radius: 6px;
    font-size: 1rem;
    text-align: center;
}

.phone-inputs input.short {
    width: 64px; /* 앞자리 박스 작게 */
}

.phone-inputs input.long {
    flex: 1; /* 중간, 끝은 동일 비율로 꽉 차게 */
}

.phone-inputs span {
    font-size: 1rem;
    color: #333;
}

.submit {
    width: 100%;
    padding: 14px;
    background-color: #3e4042;
    color: #ededed;
    font-weight: bold;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.submit:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
}
</style>
