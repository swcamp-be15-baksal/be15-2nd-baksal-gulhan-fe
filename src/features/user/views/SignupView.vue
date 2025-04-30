<script setup>

  import { useRouter } from 'vue-router';
  import { reactive, ref } from 'vue';
  import StartSignup from '@/features/user/components/StartSignup.vue';
  import SignupAgree from '@/features/user/components/SignupAgree.vue';

  const signupData = reactive({
    userId : null,
    password : null,
    confirmPassword : null,
    name : null,
    email : null,
    phone : null,
    birth : null,
    gender: null,
    address: null
  })

  const step = ref(0);

  const nextStep = () => {
    if(step.value <4) step.value +=1;
  }

  const prevStep = () => {
    if(step.value > 0) step.value -=1;
  }
</script>

<template>
  <StartSignup v-if="step === 0" @nextStep="nextStep"/>
  <SignupAgree v-if="step === 1" @nextStep="nextStep" @prevStep="prevStep" :step="step"/>

</template>

<style scoped>
</style>
