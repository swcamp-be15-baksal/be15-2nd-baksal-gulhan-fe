<script setup>
import UserInfoItem from '../components/UserInfoItem.vue';

const menuList = [
  { label: '구매 내역', to: '/mypage/orderhistory' },
  { label: '배송지 관리', to: '/mypage/deliveryaddress' },
  { label: 'MY 관심', to: '/mypage/like' },
  { label: '리뷰 관리', to: '/mypage/review' },
  { label: '작성글 관리', to: '/mypage/post' }
];
</script>

<template>
  <div class="container">
    <div class="title">
      <h1>마이페이지</h1>
    </div>
    <div class="user-info-box">
      <UserInfoItem />
    </div>

    <div class="menu-box">
      <router-link
        v-for="(menu, index) in menuList"
        :key="menu.to"
        :to="menu.to"
        class="menu-item"
        :class="{ 'no-border': index === menuList.length - 1}"
      >
        {{ menu.label}}
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

.menu-item.no-border {
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


