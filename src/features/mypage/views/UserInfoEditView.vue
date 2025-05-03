<script setup>
import { nextTick, ref } from 'vue';

// 테스트용, api 연동 후 수정
const userInfo = ref({
  id: 'lddocy',
  email: 'lddocy@baksal.com',
  name: '윤채영',
  phone: '010-1234-5678',
  birth: '2000.12.19',
  gender: '여자',
  postcode: '',
  address: '',
  detailAddress: ''
});

const gender = ref('여자');

function handleUpdate() {
  // api 로직 추가해야 됨
  console.log('수정된 회원 정보 : ', userInfo.value);
  alert('회원정보 수정이 완료되었습니다.');
}

function handlePasswordUpdate() {
  // api 로직 추가해야 됨
  alert('비밀번호 변경이 완료되었습니다.');
}

function searchPostcode() {
  new window.daum.Postcode({
    oncomplete: function (data) {
      userInfo.value.postcode = data.zonecode;
      userInfo.value.address = data.roadAddress !== '' ? data.roadAddress : data.jibunAddress;
      nextTick(() => {
        document.getElementById('detail-address')?.focus();
      });
    }
  }).open();
}

</script>

<template>
  <div class="container">
    <h2 class="title">회원 정보 수정</h2>
    <form class="info-update-form">
      <input type="text" class="no-edit" readonly v-model="userInfo.id" />
      <input type="text" class="no-edit" readonly v-model="userInfo.email" />
      <input type="text" v-model="userInfo.name" />
      <input type="text" v-model="userInfo.phone" />
      <input type="text" v-model="userInfo.birth" />
      <div class="gender-toggle">
        <button
          :class="{ active: gender === '여자'}"
          @click="gender = '여자'"
        >
          여자
        </button>
        <button
          :class="{ active: gender === '남자' }"
          @click="gender = '남자'"
        >
          남자
        </button>
      </div>
      <div class="postcode-box">
        <input type="text" v-model="userInfo.postcode" placeholder="우편번호" />
        <button type="button" @click="searchPostcode">검색</button>
      </div>
      <input type="text" v-model="userInfo.address" placeholder="기본 주소" />
      <input type="text" v-model="userInfo.detailAddress" placeholder="상세 주소" />
      <button type="submit" class="complete-button" @click="handleUpdate">회원정보 변경 저장</button>
    </form>
    <hr />
    <h2 class="title">비밀번호 변경</h2>
    <form class="info-update-form">
      <input type="password" placeholder="새로운 비밀번호" />
      <input type="password" placeholder="새로운 비밀번호 확인" />
      <button type="submit" class="complete-button" @click="handlePasswordUpdate">비밀번호 변경 저장</button>
    </form>

  </div>

</template>

<style scoped>
.container {
  width: 100%;
  justify-items: center;
}
.title {
  font-size: 1.75rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
}

hr {
  width : 80%;
  height : 10px;
  margin : 30px;
}

.info-update-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.info-update-form input {
  width: 440px;
  height: 56px;
  padding: 8px;
  border: 1px solid #3E4042;
  border-radius: 4px;
  background: white;
}

.no-edit {
  color: #A0A0A0;
}

.gender-toggle {
  display: flex;
  border: 1px solid #3E4042;
  border-radius: 4px;
  overflow: hidden;
  width: 440px;
}

.gender-toggle button {
  flex: 1;
  padding: 8px 0;
  border: none;
  background: white;
  cursor: pointer;
}

.gender-toggle button.active {
  background: #aaa678;
  color: white;
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
