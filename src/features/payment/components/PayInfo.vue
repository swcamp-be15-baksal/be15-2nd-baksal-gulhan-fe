<template>
  <div class="payinfo-detail">
    <h2 class="title">결제 정보</h2>
    <div class="price">상품 금액: {{ totalItemPrice }}원</div>
    <div class="price">배송비: {{ shippingFee }}원</div>
    <div class="total">총 결제 금액: {{ totalPrice }}원</div>

    <div class="button-container">
      <button class="dopayment">결제하기</button>
    </div>
  </div>
</template>

<style scoped>
.payinfo-detail {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  text-align: center;
}

.button-container {
  margin-top: 2rem;
}

.dopayment {
  background-color: #000000;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
}
</style>
