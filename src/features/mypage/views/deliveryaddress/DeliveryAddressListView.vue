<script setup>
import DeliveryAddressList from '@/features/mypage/components/list/deliveryaddress/DeliveryAddressList.vue';
import MyPageHeader from '@/features/mypage/components/common/MyPageHeader.vue';
import { useUserStore } from '@/features/mypage/stores/user.js';
import { computed, onMounted, ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth.js';
import { deleteDeliveryAddress, getDeliveryAddress } from '@/features/mypage/api.js';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter();
const userStore = useUserStore();
const authStore = useAuthStore();
const toast = useToast();

const userInfo = computed(() => userStore.userInfo || {});
const addressList = ref([]);
const isLoading = ref(false);

watch(() => authStore.accessToken, (token) => {
  if (token) userStore.loadUserInfo();
}, { immediate: true });

const fetchAddressList = async () => {
  try {
    isLoading.value = true;
    const token = authStore.accessToken;
    if (!token) return;

    const { data: wrapper } = await getDeliveryAddress(token);
    addressList.value = wrapper?.data?.addressList || [];
  } catch (e) {
    console.error('주소 불러오기 실패:', e?.response?.data || e.message);
    alert('배송지 불러오기에 실패했습니다.');
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchAddressList);

const goToAddressCreate = () => router.push(`/mypage/deliveryaddress/create`);
const goToAddressEdit = (deliveryAddressId) => {
  router.push(`/mypage/deliveryaddress/${deliveryAddressId}/edit`);
};

const sortedAddressList = computed(() => {
  return [...addressList.value].sort((a, b) => {
    return a.defaultAddress === 'Y' ? -1 : 1;
  });
});

const handleDelete = async (item) => {
  const confirmed = confirm(`'${item.receiver}'님의 배송지를 삭제하시겠습니까?`);
  if (!confirmed) return;
  try {
    const token = authStore.accessToken;
    await deleteDeliveryAddress(token, item.deliveryAddressId);
    toast.success('배송지가 삭제되었습니다.');
    await fetchAddressList();
  } catch (e) {
    console.error('삭제 실패:', e?.response?.data || e.message);
    toast.error('삭제에 실패했습니다.');
  }
};
</script>

<template>
    <MyPageHeader />
    <div class="delivery-container">
        <h2 class="delivery-title">배송지 관리</h2>
        <div class="add-address">
            <p @click="goToAddressCreate">배송지 추가</p>
        </div>
      <DeliveryAddressList
          :userInfo="userInfo"
          :addressList="sortedAddressList"
          :handle-delete="handleDelete"
          :goToAddressEdit="goToAddressEdit"
        />
    </div>
</template>

<style scoped>
.delivery-container {
    width: 100%;
    justify-items: center;
}
.delivery-title {
    font-size: 1.75rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 40px;
}
.add-address {
    width: 670px;
    justify-items: flex-end;
}
.add-address p {
    color: #75a9ff;
    font-size: 1rem;
    cursor: pointer;
    justify-content: flex-end;
}
</style>
