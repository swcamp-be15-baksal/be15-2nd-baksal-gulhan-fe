<script setup>
import UserInfoItem from '../components/UserInfoItem.vue';

</script>

<template>
  <div class="container">
    <div class="title">
      <h1>마이페이지</h1>
    </div>

    <div class="profile-box">
      <UserInfoItem />
    </div>

    <div class="menu-box">
      <router-link to="/mypage/orderhistory" class="menu-item">
        구매 내역
        <img class="chevron-right" src="@/assets/chevron-right.svg" alt="chevron-right"/>
      </router-link>
      <router-link to="/mypage/deliveryaddress" class="menu-item">
        배송지 관리
        <img class="chevron-right" src="@/assets/chevron-right.svg" alt="chevron-right"/>
      </router-link>
      <router-link to="/mypage/like" class="menu-item">
        MY 관심
        <img class="chevron-right" src="@/assets/chevron-right.svg" alt="chevron-right"/>
      </router-link>
      <router-link to="/mypage/review" class="menu-item">
        리뷰 관리
        <img class="chevron-right" src="@/assets/chevron-right.svg" alt="chevron-right"/>
      </router-link>
      <router-link to="/mypage/post" class="menu-item">
        작성글 관리
        <img class="chevron-right" src="@/assets/chevron-right.svg" alt="chevron-right"/>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 40px 20px;
  min-height: 100vh;

}

.title {
  text-align: center;
  margin-bottom: 40px;
}

.title h1 {
  font-size: 1.75rem;
  font-weight: bold;
}

.menu-box {
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  overflow: hidden;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.125rem;
  font-weight: bold;
  padding: 20px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  outline: none;
}

.menu-item:visited {
  color: inherit;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background-color: #f0f0f0;
}

.chevron-right {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

</style>


