<script setup>
import editIcon from '@/assets/icons/edit.svg';
import deleteIcon from '@/assets/icons/delete.svg';
import heartIcon from '@/assets/icons/heart.svg';
import starIcon from '@/assets/icons/star.svg';
import heartFilledIcon from '@/assets/icons/heartFilled.svg';
import heartEmptyIcon from '@/assets/icons/heartEmpty.svg';
import { deletePackage } from '@/features/package/api';
import { deleteGoods } from '@/features/goods/api';
import { useRouter } from 'vue-router';
import { toggleLike, fetchIsLiked } from '@/features/mypage/api.js';
import { ref, computed, onMounted } from 'vue';
import { addToCartAPI } from '@/features/cart/api.js';

onMounted(async () => {
    const id = isGoods.value ? props.data.goodsId : props.data.packageId;
    const type = isGoods.value ? 'GOODS' : 'PACKAGE';

    try {
        const res = await fetchIsLiked(id, type);
        isLiked.value = res.data?.data ?? false;
    } catch (err) {
        console.error('[좋아요 여부 확인 실패]', err);
        isLiked.value = false; // fallback
    }
});

const router = useRouter();

function goToEditPage() {
    const path = isGoods.value ? '/goods/write' : '/packages/write';
    const queryKey = isGoods.value ? 'goodsId' : 'packageId';

    router.push({
        path,
        query: { [queryKey]: props.data[queryKey] || props.data.packageId },
    });
}

const props = defineProps({
    data: {
        type: Object,
        required: true,
    },
    categoryKey: {
        type: String,
        default: 'area',
    },
    showDate: {
        type: Boolean,
        default: true,
    },
    showGuide: {
        type: Boolean,
        default: true,
    },
});

const isGoods = computed(() => props.categoryKey === 'goodsCategoryName');
const isLiked = ref(false);
const likeCount = ref(props.data.likeCount ?? 0);

function formatDate(ts) {
    if (!ts) return '';
    const date = new Date(ts);
    return date.toISOString().split('T')[0];
}

const onLikeClick = async () => {
    const id = isGoods.value ? props.data.goodsId : props.data.packageId;
    const type = isGoods.value ? 'GOODS' : 'PACKAGE';

    try {
        const res = await toggleLike(id, type);
        const likedNow = res.data.liked;
        if (likedNow !== isLiked.value) {
            isLiked.value = likedNow;
            likeCount.value += likedNow ? 1 : -1;
        }
    } catch (err) {
        console.error('[좋아요 실패]', err);
        alert('좋아요 요청 중 오류 발생');
    }
};

async function deleteItem() {
    const id = isGoods.value ? props.data.goodsId : props.data.packageId;

    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
        if (isGoods.value) {
            await deleteGoods(id);
        } else {
            await deletePackage(id);
        }
        alert('삭제가 완료되었습니다.');
        router.go(-1);
    } catch (err) {
        console.error('[삭제 실패]', err);

        if (err.response?.status === 401 || err.response?.data?.errorCode === '11003') {
            alert('로그인이 필요합니다. 다시 로그인해주세요.');
        } else {
            alert('삭제 중 오류가 발생했습니다.');
        }
    }
}

const addToCart = async () => {
    const targetType = isGoods.value ? 'GOODS' : 'PACKAGE';
    const targetId = isGoods.value ? props.data.goodsId : props.data.packageId;

    const payload = {
        quantity: 1, // 수량 기본값
        targetType,
        targetId,
    };

    try {
        const res = await addToCartAPI(payload);
        if (res.data?.success) {
            alert(res.data.data.message || '장바구니에 담겼습니다!');
        } else {
            console.warn('[장바구니 실패 응답]', res.data);
            alert(res.data.message || '장바구니 추가 실패');
        }
    } catch (err) {
        console.error('[장바구니 요청 오류]', err);
        if (err.response?.status === 401) {
            alert('로그인이 필요합니다. 로그인 후 다시 시도해주세요.');
        } else {
            alert('장바구니 추가 중 오류가 발생했습니다.');
        }
    }
};
</script>

<template>
    <div v-if="data" class="d-flex justify-content-center">
        <div class="d-flex" style="gap: 47px">
            <img :src="data.firstImage" alt="data-image" class="main-img" />

            <div class="info-box d-flex flex-column">
                <div class="d-flex justify-content-end" style="position: relative; width: 353px">
                    <button class="edit-icon" @click="goToEditPage">
                        <img :src="editIcon" alt="edit-icon" />
                    </button>
                    <button class="edit-icon" @click="deleteItem">
                        <img :src="deleteIcon" alt="delete-icon" />
                    </button>
                </div>
                <div class="data-info">
                    <button class="category" style="margin-bottom: 8px">
                        {{ data[categoryKey] }}
                    </button>
                    <div class="title">{{ data.title }}</div>
                    <div class="title" v-if="showDate">
                        {{ formatDate(data.startDate) }} ~ {{ formatDate(data.endDate) }}
                    </div>
                    <div v-if="showGuide" style="font-size: 1.4rem; font-weight: 400">
                        {{ data.guideName }} 가이드
                    </div>
                    <div class="like-review" style="margin-top: 16px">
                        <img :src="heartIcon" style="margin-left: 6px; margin-right: 6px" />
                        <span style="color: #ff268f">{{ likeCount }}</span>
                    </div>
                    <div class="like-review" style="margin-bottom: 16px">
                        <img :src="starIcon" />
                        <span style="color: #ffdc3e">{{ data.avgRating ?? 0 }}</span>
                    </div>
                    <div style="font-size: 1.3rem; color: #adadad; font-weight: 400">
                        잔여수량 {{ data.remaining }}
                    </div>
                </div>
                <button @click="onLikeClick" class="like-btn">
                    <img :src="isLiked ? heartFilledIcon : heartEmptyIcon" alt="like" />
                </button>
                <div class="price">{{ data.price.toLocaleString() }}원</div>
                <div class="buy-button">
                    <button style="background-color: #e57575" @click="addToCart">
                        장바구니 담기
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.like-btn {
    position: absolute;
    bottom: 100px;
    right: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0;
}

.like-btn img {
    width: 32px;
    height: 32px;
}

.main-img {
    width: 555px;
    height: 416px;
    border-radius: 20px;
    object-fit: cover;
}
.edit-icon {
    border: none;
    background-color: transparent;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.category {
    border: none;
    background-color: #2c2c2c;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 400;
    color: white;
    padding: 4px 12px;
}
.title {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.2;
}
.like-review {
    display: flex;
    font-size: 1.4rem;
    gap: 5px;
    align-items: center;
}
.info-box {
    height: 416px;
    position: relative;
}
.price {
    position: absolute;
    bottom: 60px;
    right: 0;
    font-size: 1.6rem;
    font-weight: 700;
}
.buy-button {
    width: 100%;
    position: absolute;
    bottom: 0;
    gap: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.buy-button button {
    width: 100%;
    height: 54px;
    font-size: 1.3rem;
    font-weight: 400;
    color: white;
    border: none;
    border-radius: 8px;
}
</style>
