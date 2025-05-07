<script setup>
import { computed, nextTick, ref, watch } from 'vue';

const emit = defineEmits(['submit']);

const {submitLabel, disabled, initialData } = defineProps({
  submitLabel: { type: String, default: '제출' },
  disabled:    { type: Boolean, default: false },
  initialData: { type: Object, default: null }
});

const formData = ref({
  receiver : '',
  receiverPhone : '',
  zipcode: '',
  address : '',
  detailAddress : '',
  defaultAddress: false
});

// 수정 모드일 때 사용
watch(
  () => initialData,
  data => {
    console.log(data);
    if (data) {
      Object.assign(formData.value, {
        receiver:       data.receiver || '',
        receiverPhone:          data.receiverPhone || '',
        zipcode:       data.zipcode || '',
        address:        data.address || '',
        detailAddress:  data.detailAddress|| '',
        defaultAddress:      data.defaultAddress === 'Y'
      });
    }
  },
  { immediate: true }
);

const isFormValid = computed(() => {
  const f = formData.value;
  return (
    f.receiver &&
    f.receiverPhone &&
    f.zipcode &&
    f.address &&
    f.detailAddress
  );
});

function submitForm() {
  const { defaultAddress, receiverPhone, ...rest } = formData.value;

  emit('submit', {
    ...rest,
    receiverPhone: receiverPhone,
    defaultAddress: defaultAddress ? 'Y' : 'N'
  });
  console.log('폼 제출 : ', {
    ...rest,
    receiverPhone: receiverPhone,
    defaultAddress: defaultAddress ? 'Y' : 'N'
  });
}

function searchZipcode() {
  new window.daum.Postcode({
    oncomplete: function (data) {
      formData.value.zipcode = data.zonecode;
      formData.value.address = data.roadAddress !== '' ? data.roadAddress : data.jibunAddress;
      nextTick(() => {
        document.getElementById('detail-address')?.focus();
      });
    }
  }).open();
}
</script>

<template>
  <div class="container">
    <form @submit.prevent="submitForm" class="delivery-address-form">
      <label for="receiver" class="form-label fw-bold text-secondary mb-0">수령인</label>
      <input
        type="text"
        placeholder="수령인"
        id="receiver"
        v-model="formData.receiver"
        :disabled="disabled"
      />
      <label for="receiverPhone" class="form-label fw-bold text-secondary mb-0">전화번호</label>
      <input
        type="text"
        placeholder="전화번호"
        id="receiverPhone"
        v-model="formData.receiverPhone"
        :disabled="disabled"
      />
      <label for="zipcode" class="form-label fw-bold text-secondary mb-0">우편번호</label>
      <div class="zipcode-box">
        <input
          type="text"
          placeholder="우편번호"
          id="zipcode"
          v-model="formData.zipcode"
          :disabled="disabled"
        />
        <button type="button" @click="searchZipcode">검색</button>
      </div>
      <label for="address" class="form-label fw-bold text-secondary mb-0">주소</label>
      <input
        type="text"
        v-model="formData.address"
        placeholder="기본 주소"
        :disabled="disabled"
      />
      <label for="detailAddress" class="form-label fw-bold text-secondary mb-0">상세 주소</label>
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
          v-model="formData.defaultAddress"
        />
        <label for="default-address">기본 배송지로 설정</label>
      </div>
      <button type="submit" class="complete-button" :disabled="!isFormValid">{{ submitLabel }}</button>
    </form>
  </div>
</template>

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

.zipcode-box {
  display: flex;
  gap: 8px;
  width: 440px;
}
.zipcode-box input,
.zipcode-box button {
  height: 56px;
  padding: 0 16px;
  line-height: 1.2;
  background-color: white;
  border: 1px solid #3E4042;
  border-radius: 4px;
  cursor: pointer;
  box-sizing: border-box;
}
.zipcode-box input {
  flex : 5;
}
.zipcode-box button {
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
