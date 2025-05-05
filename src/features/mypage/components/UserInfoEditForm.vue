<script setup>
defineProps({
  userInfo: Object,
  isFocused: Object,
  displayGender: String
})

const emit = defineEmits(['submit', 'searchPostcode'])

function onSubmit(e) {
  emit('submit', e);
}

function searchPostcode() {
  emit('searchPostcode');
}
</script>

<template>
  <div style="width: 440px;">
    <h2 class="text-center fw-bold fs-3 mb-5">회원 정보 수정</h2>
    <form @submit.prevent="onSubmit" class="d-flex flex-column gap-3 mb-5" style="width: 440px;">
      <input type="text" class="form-control mb-2" v-model="userInfo.userId" readonly
             style="height: 56px; padding: 8px; border: 1px solid #3E4042; color: #A0A0A0;" />

      <input type="text" class="form-control mb-2" v-model="userInfo.email" readonly
             style="height: 56px; padding: 8px; border: 1px solid #3E4042; color: #A0A0A0;" />

      <input type="text" class="form-control mb-2" v-model="userInfo.username" readonly
             style="height: 56px; padding: 8px; border: 1px solid #3E4042; color: #A0A0A0;" />

      <div class="position-relative mb-2" style="width: 440px;">
        <input type="text" class="form-control pe-5" v-model="userInfo.phone"
               @focus="isFocused.phone = true" @blur="isFocused.phone = false"
               style="height: 56px; padding: 8px; border: 1px solid #3E4042;" />
        <img src="@/assets/icons/edit2.svg" alt="edit"
             class="position-absolute top-50 end-0 translate-middle-y me-3"
             style="width: 20px; height: 20px; pointer-events: none;"
             :style="{ visibility: isFocused.phone ? 'hidden' : 'visible' }" />
      </div>

      <input type="text" class="form-control mb-2" v-model="userInfo.birth" readonly
             style="height: 56px; padding: 8px; border: 1px solid #3E4042; color: #A0A0A0;" />

      <input type="text" class="form-control mb-2" :value="displayGender" readonly
             style="height: 56px; padding: 8px; border: 1px solid #3E4042; color: #A0A0A0;" />

      <div class="d-flex gap-2 mb-2" style="width: 440px;">
        <input type="text" class="form-control" v-model="userInfo.address" placeholder="주소"
               style="flex: 5; height: 56px; padding: 8px; border: 1px solid #3E4042;" />
        <button type="button" @click="searchPostcode"
                style="flex: 1; height: 56px; padding: 0 16px; background-color: white; border: 1px solid #3E4042; border-radius: 4px; cursor: pointer;">
          검색
        </button>
      </div>

      <div class="position-relative" style="width: 100%;">
        <input type="text" class="form-control pe-5" v-model="userInfo.detailAddress" placeholder="상세 주소"
               @focus="isFocused.address = true" @blur="isFocused.address = false"
               style="height: 56px; padding: 8px; border: 1px solid #3E4042;" />
        <img src="@/assets/icons/edit2.svg" alt="edit"
             class="position-absolute top-50 translate-middle-y"
             style="right: 16px; width: 20px; height: 20px; pointer-events: none;"
             :style="{ visibility: isFocused.address ? 'hidden' : 'visible' }" />
      </div>

      <button type="submit"
              style="width: 440px; height: 56px; background: #3E4042; color: white; border: none; border-radius: 8px; margin-top: 30px; margin-bottom: 15px;">
        회원정보 변경 저장
      </button>
    </form>
  </div>
</template>


