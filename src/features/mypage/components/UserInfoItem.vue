<script setup>
// 예시 데이터 바인딩용
const username = '윤채영';
const user_rank = '평민';
const point_rate = 1;
const point = 1500;
const total_purchase = 150000;
</script>
<template>
  <div class="user-hello">
    <router-link to="/mypage/user/:id" class="user-item">
      <h3>{{username}}님 안녕하세요!</h3>
    </router-link>
    <router-link to="/mypage/rank" class="rank-info">
      <p>{{user_rank}} ∙ {{point_rate}}% 적립</p>
    </router-link>
  </div>
  <div class="user-info">
    <div class="point-box">
      <span class="point-label">적립금</span>
      <span class="point-value">{{point}}원</span>
    </div>
    <div class="purchase-box">
      <span class="point-label">총 구매액</span>
      <span class="point-value">{{total_purchase}}원</span>
    </div>
  </div>
</template>

<style scoped>
.user-hello {
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

.rank-info {
  text-decoration: none;
  color: inherit;
  outline: none;
}

.rank-info:visited {
  color: inherit;
}

.user-hello h3 {
  font-size: 1.125rem;
  font-weight: bold;
}

.user-hello p {
  font-size: 0.875rem;
  color: #666;
}

.user-info {
  display: flex;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px 0;
  margin-bottom: 30px;
  padding-left: 30px;
  text-decoration: none;
  color: inherit;
  outline: none;
  gap: 344px;
}

.point-box {
  text-align: center;
}
.purchase-box {
  text-align: center;
}

.point-label {
  font-size: 1.25rem;
  color: #777777;
  margin-bottom: 5px;
  padding-right: 20px;
}

.point-value {
  font-size: 1.25rem;
  font-weight: bold;
  margin-right: 50px;
}
</style>
