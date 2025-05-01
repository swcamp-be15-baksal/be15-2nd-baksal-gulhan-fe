<script setup>
import SignupStatus from '@/features/user/components/SignupStatus.vue';
import { ref, watch } from 'vue';

const emit = defineEmits(['setAgreed', 'nextStep']);

defineProps({
    step: {
        type: Number,
        required: true,
    },
});

function setAgreed() {
    emit('setAgreed');
}

function nextStep() {
    emit('nextStep');
}

const checkedAll = ref(false);
const checkedTerm1 = ref(false);
const checkedTerm2 = ref(false);

watch(checkedAll, (v) => {
    if (v === true) {
        checkedTerm1.value = v;
        checkedTerm2.value = v;
    }

    // 개별 항목 해제 기능
    if (v === false && checkedTerm1.value && checkedTerm2.value) {
        checkedTerm1.value = v;
        checkedTerm2.value = v;
    }
});

// 하위 항목 중 하나라도 변경되면 전체 동의 상태 갱신
watch([checkedTerm1, checkedTerm2], ([v1, v2]) => {
    // 둘 다 체크되어야 전체 체크됨, 하나라도 해제 시 false
    checkedAll.value = v1 && v2;
    if (!v1 || !v2) {
        checkedAll.value = false;
    }
});

const clickAgree = () => {
    if (checkedAll.value) {
        setAgreed();
        nextStep();
    }
};
</script>

<template>
    <div class="container">
        <div class="inner-title">
            <h1>회원 가입</h1>
        </div>
        <SignupStatus :step="step" />
        <div class="container inner-container">
            <div class="terms-title">
                <h1>약관 동의</h1>
            </div>
            <div class="agree all">
                <div class="agree-header">
                    <input type="checkbox" id="agreeAll" v-model="checkedAll" />
                    <label for="agreeAll">전체 동의하기</label>
                </div>
                <div class="terms-content">
                    이메일 인증된 아이디로 가입, 이용약관 동의 및 개인정보 수집 및 이용 동의를
                    포함합니다.
                </div>
            </div>
            <div class="terms-list">
                <div class="agree-item">
                    <div class="agree-header">
                        <input type="checkbox" id="terms1" v-model="checkedTerm1" />
                        <label for="terms1">걸어서 한국 속으로 이용 약관 (필수)</label>
                    </div>
                    <div class="terms-content">
                        걸어서 한국 속으로 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다.
                        본 약관은 다양한 걸어서 한국속으로 서비스의 이용과 관련하여 걸어서 한국
                        속으로 서비스를 제공하는 박살과 이를 이용하는 걸어서 한국 속으로 서비스
                        회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 걸어서
                        한국 속으로 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.
                    </div>
                </div>
                <div class="agree-item">
                    <div class="agree-header">
                        <input type="checkbox" id="terms2" v-model="checkedTerm2" />
                        <label for="terms2">개인정보 수집 및 이용 (필수)</label>
                    </div>
                    <div class="terms-content">
                        걸어서 한국 속으로 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다.
                        본 약관은 다양한 걸어서 한국속으로 서비스의 이용과 관련하여 걸어서 한국
                        속으로 서비스를 제공하는 박살과 이를 이용하는 걸어서 한국 속으로 서비스
                        회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 걸어서
                        한국 속으로 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.
                    </div>
                </div>
            </div>
            <button class="agreed" :disabled="!checkedAll" @click="clickAgree">
                동의하고 회원가입하기
            </button>
        </div>
    </div>
</template>

<style scoped>
@import '@/features/user/user.css';

.container {
    max-width: 440px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.inner-title {
    margin-bottom: 26px;
}

.inner-title h1 {
    font-size: 2rem;
    font-weight: bolder;
    color: #232527;
}

.inner-container {
    width: 100%;
    padding: 25px;
    background: #ffffff;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid #cdcdcd;
}

.terms-title {
    padding-bottom: 1rem;
}

.terms-title h1 {
    font-size: 2rem;
}

/* 공통 체크박스 섹션 */
.agree {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.agree-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

/* 체크박스 라벨 영역 */
.agree-header {
    display: flex;
    align-items: center;
    gap: 8px;
}

.agree-header input[type='checkbox'] {
    width: 18px;
    height: 18px;
    accent-color: #232527;
    cursor: pointer;
}

.agree-header label {
    font-size: 1rem;
    color: #232527;
    cursor: pointer;
}

/* 약관 본문 */
.terms-content {
    font-size: 0.75rem;
    color: #444;
    line-height: 1.5;
    padding-left: 24px;
    max-height: 70px;
    overflow-y: auto;
}

/* 항목 리스트 전체 */
.terms-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    margin-top: 16px;
    margin-bottom: 32px;
}

button[class='agreed'] {
    background-color: #3e4042;
    color: #ededed;
}

button.agreed:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
    color: #fff;
    opacity: 0.6;
}
</style>
