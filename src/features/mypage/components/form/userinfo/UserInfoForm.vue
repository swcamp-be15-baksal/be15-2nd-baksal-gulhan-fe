<script setup>
defineProps({
  userInfo: Object,
  maskedInfo: Object,
  isVerified: Boolean,
  displayGender: String
})

defineEmits(['edit', 'delete']);
</script>

<template>
  <h2 class="text-center fw-bold fs-3 mb-5">회원 정보 조회</h2>
  <div style="width: 440px;">
    <form class="d-flex flex-column gap-3 mb-5" style="width: 440px;">
      <input
        type="text"
        class="form-control mb-2"
        :value="isVerified ? userInfo.userId : maskedInfo.id"
        readonly
        style="height: 56px; padding: 8px; border: 1px solid #3E4042;"      />
      <input
        type="text"
        class="form-control mb-2"
        :value="isVerified ? userInfo.email : maskedInfo.email"
        readonly
        style="height: 56px; padding: 8px; border: 1px solid #3E4042;"      />
      <input
        type="text"
        class="form-control mb-2"
        :value="isVerified ? userInfo.username : maskedInfo.username"
        readonly
        style="height: 56px; padding: 8px; border: 1px solid #3E4042;"
      />
      <input
        type="text"
        class="form-control mb-2"
        :value="isVerified ? userInfo.phone : maskedInfo.phone"
        readonly
        style="height: 56px; padding: 8px; border: 1px solid #3E4042;"
      />
      <input
        type="text"
        class="form-control mb-2"
        :value="isVerified ? userInfo.birth : maskedInfo.birth"
        readonly
        style="height: 56px; padding: 8px; border: 1px solid #3E4042;"
      />
      <input
        type="text"
        class="form-control mb-2"
        :value="displayGender"
        readonly
        style="height: 56px; padding: 8px; border: 1px solid #3E4042;"
      />
      <input
        type="text"
        class="form-control"
        :value="isVerified ? userInfo.address : maskedInfo.address"
        readonly
        style="height: 56px; padding: 8px; border: 1px solid #3E4042;"
      />

      <button
        type="button"
        class="border-0 rounded mt-4 mb-3"
        @click="$emit('edit')"
        style="width: 440px; height: 56px; background-color: #3E4042; color: white; cursor: pointer;"
      >
        회원 정보 수정
      </button>

      <a
        href="#"
        @click.prevent="$emit('delete')"
        class="text-center"
        style="color: #777777; text-decoration: underline; font-size: 16px; cursor: pointer;"
      >
        회원탈퇴
      </a>
    </form>
  </div>
</template>
