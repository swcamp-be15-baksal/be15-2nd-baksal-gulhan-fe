<script setup>
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const useLayout = computed(() => route.meta.layout !== 'none');
</script>

<template>
    <div id="app">
        <Header />
        <div :class="useLayout ? 'layout' : ''">
            <router-view />
        </div>
        <Footer />
    </div>
</template>

<style>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css');

* {
    font-family: 'Pretendard Variable', sans-serif;
}

#app {
    width: 100%;
}

.layout {
    min-height: 100vh;
    padding: 76px 108px;
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: #fffdf8;
}
</style>
