<script setup>
import userValid from '../validator/userValid';
import { addKakaoAdditionalInfo } from '../api/user.js';

import { ref, computed, nextTick, watch, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const phone1 = ref('');
const phone2 = ref('');
const phone3 = ref('');
const isLoading = ref(false);

const signupData = ref({
  userId: sessionStorage.getItem('kakao_userId') || '',
  username: sessionStorage.getItem('kakao_username') || '',
  email: '',
  birth: '',
  gender: '',
  phone: '',
  address: '',
  detailAddress: '',
});

watch([phone1, phone2, phone3], () => {
  signupData.value.phone = `${phone1.value}-${phone2.value}-${phone3.value}`;
});

onMounted(() => {
  if (route?.state?.userId) {
    sessionStorage.setItem('kakao_userId', route.state.userId);
  }
  if (route?.state?.username) {
    sessionStorage.setItem('kakao_username', route.state.username);
  }
});

const isEmailValid = computed(() =>
  userValid.validateEmail(signupData.value.email));

const isFormValid = computed(
  () =>
    !!signupData.value.userId?.trim() &&
    !!signupData.value.email?.trim() &&
    !!signupData.value.phone?.trim() &&
    !!signupData.value.birth?.trim() &&
    !!signupData.value.gender?.trim() &&
    !!signupData.value.address?.trim() &&
    isEmailValid.value
);


const popupWidth = 500;
const popupHeight = 600;

function openPostcodeSearch() {
  new daum.Postcode({
    oncomplete: function (data) {
      const selectedAddress = data.roadAddress || data.jibunAddress;
      signupData.value.address = selectedAddress;
      nextTick(() => {
        document.getElementById('detailAddress')?.focus();
        window.close();
      });
    },
  }).open({
      left: window.screen.width / 2 - popupWidth / 2,
      top: window.screen.height / 2 - popupHeight / 2,
  });
}

function formatDate(input) {
  if (!/^\d{8}$/.test(input)) return null; // 형식이 8자리 숫자가 아니면 null 반환
  const year = input.slice(0, 4);
  const month = input.slice(4, 6);
  const day = input.slice(6, 8);
  return `${year}-${month}-${day}`;
}

const onClickSignup = async () => {
  try {
    if (!isFormValid.value) {
      throw Error('입력 값이 잘못 되었습니다.');
    }

    isLoading.value = true;

    const fullAddress = `${signupData.value.address} ${signupData.value.detailAddress?.trim() || ''}`.trim();

    const payload = {
      userId: signupData.value.userId,
      email: signupData.value.email,
      gender: signupData.value.gender,
      birth: formatDate(signupData.value.birth),
      phone: signupData.value.phone,
      address: fullAddress,
      countryCode: '82',
    };

    console.log('카카오 유저 데이터 전송:', JSON.stringify(payload));
    await addKakaoAdditionalInfo(payload);

    toast.success('회원가입이 완료되었습니다.');
    router.push('/');
  } catch (e) {
    console.log(e.response.data.message);
    toast.error(e?.response?.data?.message || '회원가입 중 문제가 발생했습니다.');
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="container">
    <div class="inner-title">
      <h1>추가 정보 입력</h1>
    </div>

    <div class="form-wrapper">
      <div class="input-box">
        <input v-model="signupData.userId" readonly />
      </div>

      <div class="input-box">
        <input v-model="signupData.username" readonly />
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
        <input v-model="signupData.birth" placeholder="생년월일 8자리" maxlength="8" inputmode="numeric" />
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
        <input
          id="detailAddress"
          v-model="signupData.detailAddress"
          placeholder="상세 주소" />
      </div>
      <button class="submit" :disabled="!isFormValid || isLoading" @click="onClickSignup">
        <span v-if="!isLoading">회원가입</span>
        <span v-else class="spinner"></span>
      </button>
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

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
