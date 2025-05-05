<script setup>
defineProps(['password', 'passwordConfirm']);
defineEmits(['submit']);

const password = defineModel('password');
const passwordConfirm = defineModel('passwordConfirm');
</script>

<template>
  <div>
    <hr style="width: 80%; height: 10px; margin: 30px;" />

    <h2 class="text-center fw-bold fs-3 mb-5">비밀번호 변경</h2>
    <form @submit.prevent="$emit('submit')" class="d-flex flex-column gap-3" style="width: 440px;">
      <input
        type="password"
        class="form-control mb-2"
        v-model="password"
        placeholder="새로운 비밀번호"
        style="height: 56px; padding: 8px; border: 1px solid #3E4042;"
      />
      <input
        type="password"
        class="form-control mb-2"
        v-model="passwordConfirm"
        placeholder="새로운 비밀번호 확인"
        style="height: 56px; padding: 8px; border: 1px solid #3E4042;"
      />
      <button
        type="submit"
        style="width: 440px; height: 56px; background: #3E4042; color: white; border: none; border-radius: 8px; margin-top: 30px; margin-bottom: 15px;"
      >
        비밀번호 변경 저장
      </button>
    </form>
  </div>
</template>

