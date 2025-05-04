<script setup>
import { reactive, ref } from 'vue';
import StartSignup from '@/features/user/components/StartSignup.vue';
import SignupTerms from '@/features/user/components/SignupTerms.vue';
import SignupForm from '@/features/user/components/SignupForm.vue';
import SignupFinish from '../components/SignupFinish.vue';

const signupData = reactive({
    userId: null,
    password: null,
    confirmPassword: null,
    name: null,
    email: null,
    phone: null,
    birth: null,
    gender: null,
    address: null,
    agreed: false,
});

const step = ref(0);

const nextStep = () => {
    if (step.value < 4) step.value += 1;
};

const prevStep = () => {
    if (step.value > 0) step.value -= 1;
};

const setAgreed = () => {
    signupData.agreed = true;
};
</script>

<template>
    <StartSignup v-if="step === 0" @nextStep="nextStep" />
    <SignupTerms v-if="step === 1" @setAgreed="setAgreed" @nextStep="nextStep" :step="step" />
    <SignupForm
        v-if="step === 2"
        @nextStep="nextStep"
        v-model:signupData="signupData"
        :step="step" />
    <SignupFinish
     v-if="step === 3"
     :step="step"/>
</template>

<style scoped></style>
