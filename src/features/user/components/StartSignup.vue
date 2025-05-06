<script setup>

const emit =defineEmits(['nextStep'])

function nextStep() {
  emit('nextStep');
}
</script>

<template>
  <div class="container">
    <div class="inner-title">
      <h1>가입을 시작합니다.</h1>
    </div>
    <div class="inner-text">
      <p>
        로컬의 시선으로 한국을 보고 싶다면?
        <br>
        지금 <strong>걸어서 한국속으로</strong>의 여정에 함께하세요.
      </p>
    </div>
    <button class="signup" @click="nextStep">일반 회원가입</button>
    <button class="kakao-signup">
      <img class="kakao-logo" src="@/assets/icons/kakao-logo.svg" alt="kakao-logo" />
      카카오 회원가입
    </button>
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
  color: #232527;
  font-weight: bold;
}

.inner-title {
  margin: 43px auto 54px;
}

.inner-text {
  text-align: center;
  color: #232527;
  font-size: 1rem;
  margin-bottom: 72px;
}

.signup{
  background-color: #3e4042;
  color: #ededed;
}

.kakao-signup{
  background-color: #fee500;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
