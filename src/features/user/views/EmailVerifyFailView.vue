<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const gotoHome = () => {
    router.push("/");
}

const gotoLogin = () => {
    router.push("/login")
}
</script>

<template>
    <div class="container">
        <div class="inner-title">
            <h1>이메일 인증 실패</h1>
        </div>
    <div class="contianer inner-container">
            <img class="logo" src="@/assets/icons/logo-black.svg" alt="logo">
            <img class="fail-img" src="@/assets/icons/email-fail.svg" alt="email-fail"/>
        <div class="signup-finish">
            <h2>
                이메일 인증 실패
            </h2>
        </div>
        <div class="signup-content">
            <p>이메일 인증이 실패하였습니다.</p>
        </div>
    </div>
    <div class="button-list">
        <button class="home" @click="gotoHome">홈으로</button>
        <button class="login" @click="gotoLogin">로그인</button>
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
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #cdcdcd;
    margin-bottom: 1rem;
}

.logo{
    width:60%;
}

.fail-img {
    width: 20%;
    margin-top: 3rem;
    margin-bottom: 3rem;
}

.signup-finish{
    margin-bottom: 30px;
}

.signup-finish h2{
    font-size: 30px;
    font-weight: bold;

}

.signup-content {
    display: flex;
    flex-direction: column;
}

.signup-content p{
    text-align: center;
    margin-bottom: 0%;
    font-size: 1rem;
}

.button-list{
    display: flex;
    gap: 10px;
    width: 100%;
}

button[class="home"]{
    background-color: #5d857d;
    color: #ededed;
}



</style>
