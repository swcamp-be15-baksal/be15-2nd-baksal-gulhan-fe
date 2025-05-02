<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps(['maskedId']);

const gotoFindPassword = () => {
    router.replace('/find/password');
};

const gotoLogin = () => {
    router.replace('/login');
};
</script>

<template>
    <div class="container">
        <div class="contianer inner-container">
            <img class="logo" src="@/assets/logo-black.svg" alt="logo" />
            <img class="checked-img" src="@/assets/checked.svg" alt="checked" />
            <div class="signup-finish">
                <h2>아이디 찾기 완료</h2>
            </div>
            <div class="signup-content">
                <p>
                    회원님의 아이디는 <strong>{{ props.maskedId }}</strong> 입니다.
                </p>
            </div>
        </div>
        <div class="button-list">
            <button class="home" @click="gotoFindPassword">비밀번호 찾기</button>
            <button class="login" @click="gotoLogin">로그인</button>
        </div>
    </div>
</template>

<style scoped>
@import '@/features/user/user.css';

.container {
    max-width: 600px;
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
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #cdcdcd;
    margin-bottom: 1rem;
}

.signup-finish {
    margin-bottom: 30px;
}

.signup-finish h2 {
    font-size: 2rem;
    font-weight: bold;
}

.logo {
    width: 60%;
}

.checked-img {
    width: 15%;
    margin-top: 3rem;
    margin-bottom: 3rem;
}

.button-list {
    display: flex;
    gap: 10px;
    width: 100%;
}

.signup-content p {
    font-size: 1.25rem;
}
</style>
