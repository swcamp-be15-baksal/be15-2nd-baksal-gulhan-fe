<template>
  <div class="container">
    <form @submit.prevent="submitForm" class="delivery-address-form">
      <input
        type="text"
        placeholder="수령인"
        id="receiver"
        v-model="formData.receiver"
        :disabled="disabled"
      />
      <input
        type="text"
        placeholder="전화번호"
        id="phone"
        v-model="formData.phone"
        :disabled="disabled"
      />
      <div class="postcode-box">
        <input
          type="text"
          placeholder="우편번호"
          id="postcode"
          v-model="formData.postcode"
          :disabled="disabled"
        />
        <button type="button" @click="searchPostcode">검색</button>
      </div>
      <input
        type="text"
        v-model="formData.address"
        placeholder="기본 주소"
        :disabled="disabled"
      />
      <input type="text"
             id="detail-address"
             v-model="formData.detailAddress"
             placeholder="상세 주소"
             :disabled="disabled"
      />
      <div class="default-checkbox">
        <input
          type="checkbox"
          id="default-address"
          class="default-address"
          v-model="formData.isDefault"
        />
        <label for="default-address">기본 배송지로 설정</label>
      </div>
      <button type="submit" class="complete-button" :disabled="!isFormValid">{{ submitLabel }}</button>
    </form>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue';

const {initialData, submitLabel, disabled } = defineProps({
  initialData: { type: Object, default: null },
  submitLabel: { type: String, default: '제출' },
  disabled:    { type: Boolean, default: false }
});

const formData = ref({
  receiver : '',
  phone : '',
  postcode: '',
  address : '',
  detailAddress : '',
  isDefault: false
});

// 수정 모드이면 initialData 주입
watch(
  () => initialData,
  data => {
    if (data) {
      Object.assign(formData.value, {
        receiver:       data.receiver,
        phone:          data.phone,
        postcode:       data.postcode,
        address:        data.address,
        detailAddress:  data.detailAddress,
        isDefault:      data.isDefault === 'Y'
      });
    }
  },
  { immediate: true }
);

const isFormValid = computed(() => {
  const f = formData.value;
  return (
    f.receiver &&
    f.phone &&
    f.postcode &&
    f.address &&
    f.detailAddress
  );
});

function submitForm() {
  const { isDefault, ...rest } = formData.value;
  // 백엔드 연동 후 주석 해제
  // emit(
  //   'submit',
  //   { payload: { ...rest, isDefault: isDefault ? 'Y' : 'N' }
  //   });
  console.log('제출 테스트 입니다 :', {
    ...rest,
    isDefault: isDefault ? 'Y' : 'N'
  });
}

function searchPostcode() {
  new window.daum.Postcode({
    oncomplete: function (data) {
      formData.value.postcode = data.zonecode;
      formData.value.address = data.roadAddress !== '' ? data.roadAddress : data.jibunAddress;
      nextTick(() => {
        document.getElementById('detail-address')?.focus();
      });
    }
  }).open();
}
</script>

<style scoped>
.container {
  width: 100%;
  justify-items: center;
}
.delivery-address-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.delivery-address-form input {
  width: 440px;
  height: 56px;
  padding: 8px;
  border: 1px solid #3E4042;
  border-radius: 4px;
  background: white;
}

.postcode-box {
  display: flex;
  gap: 8px;
  width: 440px;
}
.postcode-box input,
.postcode-box button {
  height: 56px;
  padding: 0 16px;
  line-height: 1.2;
  background-color: white;
  border: 1px solid #3E4042;
  border-radius: 4px;
  cursor: pointer;
  box-sizing: border-box;
}
.postcode-box input {
  flex : 5;
}
.postcode-box button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.default-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
}

.default-checkbox input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: #3E7BFA;
}
.complete-button {
  width: 440px;
  height: 56px;
  background: #3E4042;
  color: white;
  border: none;
  border-radius: 8px;
  margin-top: 30px;
  margin-bottom: 15px;
  cursor: pointer;
}

</style>
