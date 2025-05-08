<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { loginUser } from '../api/user';

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

const userId = ref('');
const password = ref('');

const handleLogin = async () => {
    try {
        // 1. 공백 제거
        userId.value = userId.value.trim();
        password.value = password.value.trim();
        if (!userId.value || !password.value) {
            toast.error('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }

        const resp = await loginUser({ userId: userId.value, password: password.value });
        const at = resp.data.data.accessToken;
        authStore.setAuth(at);
        await router.replace('/');
    } catch (e) {
      console.log(e)
        toast.error(e.response.data.message);
        // console.log(e);
    }
};

console.log(window.Kakao.isInitialized());
function loginWithKakao() {
  window.Kakao.Auth.authorize({
    redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI
  });
}

</script>

<template>
    <div class="container">
        <div class="inner-title">
            <h1>로그인</h1>
        </div>
        <form @submit.prevent="handleLogin">
            <input v-model="userId" type="text" placeholder="아이디" />
            <input v-model="password" type="password" placeholder="비밀번호" />
            <div class="info-user">
                <ul class="list-user">
                    <RouterLink to="/find/id">아이디 찾기</RouterLink>
                    <RouterLink to="/find/password">비밀번호 찾기</RouterLink>
                </ul>
            </div>
            <button type="submit" class="login">로그인</button>
        </form>

        <button class="kakao-login" @click="loginWithKakao">
            <img class="kakao-logo" src="@/assets/icons/kakao-logo.svg" alt="kakao-logo" />
            카카오 로그인
        </button>
        <p id="token-result"></p>
        <hr />
        <button @click="router.push('/signup')" class="signup">회원 가입</button>
    </div>
</template>

<style scoped>
@import '@/features/user/user.css';

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

input[type='text'],
input[type='password'] {
    margin-bottom: 8px;
    width: 100%;
    border: 1px solid #797472;
    border-radius: 6px;
    outline: none;
    padding: 10px;
    font-size: 1rem;
}

.list-user {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    list-style: none;
    padding: 0;
}

.list-user a {
    text-decoration: none;
    color: #a0a0a0;
    transition: color 0.2s ease;
}

.list-user a:hover {
    color: #232527;
}

input:focus {
    border: 1px solid #000000;
}

button.login {
    width: 100%;
    margin-top: 8px;
    padding: 10px;
    background-color: #232527;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

button.kakao-login {
    width: 100%;
    margin-top: 8px;
    padding: 10px;
    background-color: #fee500;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

button.signup {
    width: 100%;
    padding: 10px;
    background-color: #5d857d;
    color: #ededed;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

hr {
    width: 100%;
    border: none;
    height: 1px;
    background-color: #3e4042;
    margin: 16px 0;
}
</style>
