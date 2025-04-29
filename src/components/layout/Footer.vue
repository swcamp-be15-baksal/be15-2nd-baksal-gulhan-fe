<script setup></script>

<template>
    <footer class="footer">
        <div class="team-info">
            <p>상호명:</p>
            <p>주소:</p>
            <p>사업자등록번호:</p>
            <p>개인정보보호책임자:</p>
        </div>
        <div class="customer-center">
            <p class="location">고객센터</p>
            <p class="phone">010-0000-0000</p>
            <p>영업시간: 10:00 - 17:30</p>
            <p>주말, 공휴일 휴무</p>
        </div>
        <div class="footer-logo">
            <img src="@/assets/logo-white.svg" alt="logo-white" />
        </div>
    </footer>
</template>

<style scoped>
.footer {
    background: #4e5457;
    color: white;
    padding-top: 37px;
    padding-bottom: 25px;
    padding-left: 108px;
    padding-right: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.team-info,
.customer-center {
    font-weight: 400;
    font-size: 16px;
    gap: 7px;
}

.phone,
.location {
    font-weight: 700;
}

.footer-logo img {
    height: 85px;
}
</style>
