<template>
    <header class="header">
        <div class="header-top">
            <div class="user-menu">
                <button class="icon-small" @click="navigate('home')">
                    <img src="../../assets/icons/home.svg" alt="home" />
                </button>
                <button class="icon-small" @click="navigate('cart')">
                    <img src="../../assets/icons/cart.svg" alt="cart" />
                </button>
                <button @click="navigate('login')" v-if="!authStore.isAuthenticated">로그인</button>
                <button @click="handleLogout" v-else>로그아웃</button>
                <button @click="navigate('signup')">회원가입</button>
                <button @click="navigate('mypage')">마이페이지</button>
            </div>
        </div>

        <div class="header-bottom">
            <button class="logo-button" @click="navigate('home')">
                <img src="../../assets/icons/logo-black.svg" alt="logo-black" />
            </button>
            <nav class="nav-menu">
                <button @click="navigate('place')">관람 정보</button>
                <button @click="navigate('packages')">패키지</button>
                <button @click="navigate('goods')">기념품</button>
                <button @click="navigate('notice')">공지사항</button>
            </nav>
        </div>
    </header>
</template>

<style scoped>
.header {
    width: 100%;
    background: #fff;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    position: relative;
    z-index: 10;
}

.icon-small {
    width: 24px;
    height: 24px;
    object-fit: contain;
    cursor: pointer;
}

.header-top {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 54px;
    padding-bottom: 16px;
}

.user-menu {
    display: flex;
    gap: 16px;
    align-items: center;
}

.user-menu button {
    all: unset;
    font-size: 1rem;
    font-weight: 300;
    color: #000;
    cursor: pointer;
}

.user-menu img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
}

.header-bottom {
    display: flex;
    justify-content: space-between;
    height: 84px;
    align-items: flex-end;
}

.logo-button {
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.logo-button img {
    height: 83px;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
}

.nav-menu {
    display: flex;
    flex-grow: 1;
    justify-content: space-evenly;
}

.nav-menu button {
    all: unset;
    display: inline-block;
    font-size: 1.5rem;
    font-weight: 500;
    cursor: pointer;
}
</style>

<script setup>
import { logoutUser } from '@/features/user/api/user';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = async () => {
    try {
        const accessToken = authStore.accessToken;
        await logoutUser(accessToken);
        authStore.clearAuth();
        console.log('로그아웃!');
    } catch (e) {
        console.log(e);
    }
};

function navigate(target) {
    switch (target) {
        case 'login':
            router.push('/login');
            break;
        case 'signup':
            router.push('/signup');
            break;
        case 'mypage':
            router.push('/mypage');
            break;
        case 'home':
            router.push('/');
            break;
        case 'place':
            router.push('/place');
            break;
        case 'packages':
            router.push('/packages');
            break;
        case 'goods':
            router.push('/goods');
            break;
        case 'notice':
            router.push('/notice');
            break;
        case 'cart':
            router.push('/cart');
            break;
    }
}
</script>
