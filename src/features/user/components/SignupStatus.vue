<script setup>
defineProps({
    step: {
      type:Number,
      required: true
    }
  }
);
</script>

<template>
  <div class="signup-level">
    <div class="agree-state">
      <p>1. 약관 동의</p>
      <div :class="{ statusbar: true, confirm: step > 0 }" />
    </div>
    <div class="agree-state">
      <p>2. 정보 입력</p>
      <div :class="{ statusbar: true, confirm: step > 1 }" />
    </div>
    <div class="agree-state">
      <p>3. 가입 완료</p>
      <div :class="{ statusbar: true, confirm: step > 2 }" />
    </div>
  </div>
</template>

<style scoped>
/* 상단 바 CSS */
.signup-level {
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 8px;
  margin-bottom: 26px;
}

.statusbar {
  height: 16px;
  border-radius: 12px;
  background-color: #a0a0a0;
}

.confirm {
  background-color: #5d857d;
}

.agree-state p {
  text-align: center;
  color: #232527;
  font-size: 1rem;
}

.agree-state {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
