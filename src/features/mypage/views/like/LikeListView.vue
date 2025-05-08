<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import PaginationBar from '@/components/common/PaginationBar.vue';
import { useRoute, useRouter } from 'vue-router';
import ItemCard from '@/components/common/ItemCard.vue';
import FilterHeader from '@/features/mypage/components/common/FilterHeader.vue';
import MyPageHeader from '@/features/mypage/components/common/MyPageHeader.vue';
import { useAuthStore } from '@/stores/auth.js';
import { useToast } from 'vue-toastification';
import { fetchLikes } from '@/features/mypage/api.js';
import { fetchPackageDetail } from '@/features/package/api.js';
import { fetchGoodsDetail } from '@/features/goods/api.js';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

const isLoading = ref(false);

const currentPage = ref(1);
const itemsPerPage = 20;
const selectedFilter = ref('전체');
const targetTypeMap = {
  '패키지': 'PACKAGE',
  '기념품': 'GOODS',
  '전체': ''
};

const likes = ref([]);
const packages = ref([]);
const goods = ref([]);
const pagination = ref({});

const likedPackageIds = computed(() => {
  return likes.value
    .map((l) => Number(l.targetId))
    .filter((id) => packages.value.some((p) => p.packageId === id));
});

const likedGoodsIds = computed(() => {
  return likes.value
    .map((l) => Number(l.targetId))
    .filter((id) => goods.value.some((g) => g.goodsId === id));
});

const allLikedItems = computed(() => {
  return likes.value
    .map((l) => {
      const id = Number(l.targetId);
      if (isNaN(id)) return null;

      const pkg = packages.value.find((p) => p.packageId === id);
      if (pkg) return pkg;

      const good = goods.value.find((g) => g.goodsId === id);
      if (good) return good;

      return null;
    })
    .filter((item) => item !== null);
});

const filteredItems = computed(() => {
  if (selectedFilter.value === '전체') return allLikedItems.value;
  if (selectedFilter.value === '패키지')
    return packages.value.filter((p) => likedPackageIds.value.includes(p.packageId));
  if (selectedFilter.value === '기념품')
    return goods.value.filter((g) => likedGoodsIds.value.includes(g.goodsId));
  return [];
});

const totalPages = computed(() =>
  Math.ceil(filteredItems.value.length / itemsPerPage)
);

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredItems.value.slice(start, start + itemsPerPage);
});

const loadLikesData = async () => {
  isLoading.value = true;
  try {
    const token = authStore.accessToken;
    if (!token) {
      console.log('엑세스 토큰 없음');
      toast.error('로그인이 필요합니다!');
      setTimeout(() => {
        router.push({ name: 'login' });
      }, 500);
      return;
    }

    const filter = selectedFilter.value?.trim();
    const rawType = targetTypeMap[filter];
    const params = {
      page: currentPage.value,
      size: itemsPerPage,
      ...(rawType ? { targetType: rawType } : {}) // 전체일 땐 안 보냄
    };

    const res = await fetchLikes(token, params);
    const likesRaw = res.data?.data?.likes ?? [];
    likes.value = likesRaw;
    pagination.value = res.data?.data?.pagination ?? {};

    const targetIds = likesRaw
      .map((l) => Number(l.targetId))
      .filter((id) => !isNaN(id));

    const packageDetails = [];
    const goodsDetails = [];

    for (const id of targetIds) {
      if (filter === '패키지') {
        const res = await fetchPackageDetail(id);
        if (res.data?.data) packageDetails.push(res.data.data);
      } else if (filter === '기념품') {
        const res = await fetchGoodsDetail(id);
        if (res.data?.data) goodsDetails.push(res.data.data);
      } else {
        const [pkgRes, goodsRes] = await Promise.allSettled([
          fetchPackageDetail(id),
          fetchGoodsDetail(id),
        ]);
        if (pkgRes.status === 'fulfilled' && pkgRes.value?.data?.data)
          packageDetails.push(pkgRes.value.data.data);
        if (goodsRes.status === 'fulfilled' && goodsRes.value?.data?.data)
          goodsDetails.push(goodsRes.value.data.data);
      }
    }

    packages.value = packageDetails;
    goods.value = goodsDetails;

  } catch (e) {
    toast.error(`데이터 로딩 실패 : ${e.response?.data?.message || e.message}`);
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};


onMounted(async () => {
  const page = Number(route.query.page || 1);
  currentPage.value = page < 1 ? 1 : page;
  await loadLikesData();
});

watch(selectedFilter, async () => {
  currentPage.value = 1;
  await loadLikesData();
});
</script>

<template>
    <MyPageHeader />
    <div class="wrapper">
        <FilterHeader @update:filter="selectedFilter = $event" />
        <div v-if="isLoading" class="text-center my-10">
          <span>로딩 중입니다...</span>
        </div>
      <div v-else>
        <div class="grid">
            <ItemCard
                v-for="item in paginatedItems"
                :key="item.packageId ? `package_${item.packageId}` : `goods_${item.goodsId}`"
                :data="item"
                :idKey="item.packageId ? 'packageId' : 'goodsId'"
                :linkPrefix="item.packageId ? '/packages' : '/goods'"
                :categoryKey="item.packageId ? 'area' : 'goodsCategoryName'"
                :showDate="!!item.startDate" />
        </div>
        <PaginationBar
            :current-page="currentPage"
            :total-pages="totalPages"
            @update:page="updatePage" />
      </div>
    </div>
</template>

<style scoped>
.wrapper {
    max-width: 1040px;
    margin: 0 auto;
}
.grid {
    margin-top: 52px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 52px;
}
</style>
