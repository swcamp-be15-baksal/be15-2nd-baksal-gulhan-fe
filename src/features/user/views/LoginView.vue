<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
    <div class="container">
        <div class="inner-title">
            <h1>로그인</h1>
        </div>
        <input type="text" placeholder="아이디" />
        <input type="text" placeholder="비밀번호" />
        <div class="info-user">
            <ul class="list-user">
                <RouterLink to="/find/id">아이디 찾기</RouterLink>
                <RouterLink to="/find/password">비밀번호 찾기</RouterLink>
            </ul>
        </div>
        <!--        TODO : 라우팅 구현하기-->
        <button class="login">로그인</button>
        <button class="kakao-login">
            <img class="kakao-logo" src="../../../assets/icons/kakao-logo.svg" alt="kakao-logo" />
            카카오 로그인
        </button>
        <hr />
        <button @click="router.push('/signup')" class="signup">회원 가입</button>
    </div>
</template>

<style scoped>
.container {
    max-width: 440px;
    margin: auto;
    padding: 25px;
    background: #ffffff;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4px 4px rgb(0 0 0 /25%);
}

.container h1 {
    font-size: 2em;
    font-weight: bold;
}

.inner-title {
    margin: 43px auto 54px;
}

.info-user {
    width: 100%;
    margin-bottom: 8px;
}

input[type='text'] {
    margin-bottom: 8px;
    width: 100%;
    border: 1px solid #797472;
    border-radius: 6px;
    outline: none;
    padding: 10px;
    font-size: 1rem;
}

.kakao-logo {
    width: 24px;
    vertical-align: middle;
    margin-right: 8px;
}

.list-user {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    list-style: none;
}

.list-user a {
    text-decoration: none;
    color: #A0A0A0; /* 기본 색상 */
    transition: color 0.2s ease;
}

.list-user a:hover {
    color: #232527; /* 클릭 시 */
}

input[type='text']:focus {
    border: 1px solid #000000;
}

button {
    width: 100%;
    margin-bottom: 8px;
    border: none;
    border-radius: 12px;
    padding: 20px;
    transition: filter 0.2s ease;
}

button:hover {
    filter: brightness(95%);
}

button:active {
    filter: brightness(90%);
}

button[class='login'] {
    background-color: #3e4042;
    color: #ededed;
}

button[class='kakao-login'] {
    background-color: #fee500;
    display: flex;
    align-items: center;
    justify-content: center;
}

button[class='signup'] {
    background-color: #5d857d;
    color: #ededed;
}

hr {
    width: 100%;
    border: none;
    height: 1px;
    background-color: #3e4042;
    margin: 16px 0;
}
</style>
