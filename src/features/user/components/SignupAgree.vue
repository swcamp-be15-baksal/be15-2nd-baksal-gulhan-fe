<script setup>
import SignupStatus from '@/features/user/components/SignupStatus.vue';

defineProps({
    step: {
        type: Number,
        required: true,
    },
});
</script>

<template>
    <div class="container">
        <div class="inner-title">
            <h1>회원 가입</h1>
        </div>
        <SignupStatus :step="step" />
        <div class="container inner-container">
<!--          <AgreeForm />-->
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
}

.inner-title {
    margin-bottom: 26px;
}

.inner-title h1 {
    font-size: 2rem;
    font-weight: bolder;
    color: #232527;
}

/* 여기 까지.. */
.inner-container {
    max-width: 440px;
    margin: auto;
    padding: 25px;
    background: #ffffff;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #cdcdcd;
}
</style>
