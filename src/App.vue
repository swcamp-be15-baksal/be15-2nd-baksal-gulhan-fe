<script setup>
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
</script>

<template>
    <div id="app">
        <Header />
        <router-view />
        <Footer />
    </div>
</template>

<style scoped>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css');

* {
    font-family: 'Pretendard Variable', sans-serif;
}
</style>
