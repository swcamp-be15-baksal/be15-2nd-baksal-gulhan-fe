<script setup>
// 예시 데이터 바인딩용
const username = '윤채영';
const user_rank = '평민';
const point_rate = 1;
const point = 1500;
const total_purchase = 150000;
</script>
<template>

  <div class="user-summary">
    <router-link :to="`/mypage/userinfo`" class="user-item">
      <h3>{{username}}님 안녕하세요!</h3>
    </router-link>
      <p>{{user_rank}} ∙ {{point_rate}}% 적립</p>
  </div>

  <div class="user-order">
    <div class="order-item">
      <span class="order-label">적립금</span>
      <span class="order-value">{{point}}원</span>
    </div>
    <div class="order-item">
      <span class="order-label">총 구매액</span>
      <span class="order-value">{{total_purchase}}원</span>
    </div>
  </div>
</template>

<style scoped>
.user-summary {
  padding: 20px 30px 1px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-bottom: 30px;
}

.user-item {
  text-decoration: none;
  color: inherit;
  outline: none;
}

.user-item:visited {
  color: inherit;
}

.user-summary h3 {
  font-size: 1.125rem;
  font-weight: bold;
}

.user-summary p {
  font-size: 0.875rem;
  color: #666;
}

.user-order {
  display: flex;
  width: 100%;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px 30px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  align-items: center;
}

.order-item {
  flex: 1;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.order-label {
  font-size: 1.25rem;
  color: #777777;
  margin-right: 20px;
}

.order-value {
  font-size: 1.25rem;
  font-weight: bold;
}

</style>
