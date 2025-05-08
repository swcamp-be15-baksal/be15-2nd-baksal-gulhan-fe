<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { updateReview } from '@/features/mypage/api2.js';
import { useAuthStore } from '@/stores/auth.js';

const { initialData, submitLabel = '제출' } = defineProps({
    initialData: { type: Object, default: null },
    submitLabel: { type: String, default: '제출' },
    initialData: { type: Object, default: null },
    submitLabel: { type: String, default: '제출' },
});

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

const rating = ref(0);
const hover = ref(0);
const imageFile = ref(null);
const imageUrl = ref(null);

const formData = ref({
    detail: '',
    image: '',
    detail: '',
    image: '',
});

const isFormValid = computed(() => {
    return rating.value > 0 && formData.value.detail.trim().length > 0;
    return rating.value > 0 && formData.value.detail.trim().length > 0;
});

watch(
    () => initialData,
    (data) => {
        if (data) {
            rating.value = data.rating ?? 0;
            imageUrl.value = data.image ?? null;
            formData.value.detail = data.detail ?? '';
            formData.value.image = data.image ?? '';
        }
    },
    { immediate: true }
);

function setRating(n) {
    rating.value = n;
    rating.value = n;
}

function handleImage(event) {
    const file = event.target.files[0];
    if (file) {
        imageFile.value = file;
        imageUrl.value = URL.createObjectURL(file);
        formData.value.image = file;
    }
}

function removeImage() {
    imageFile.value = null;
    imageUrl.value = null;
    formData.value.image = '';
    imageFile.value = null;
    imageUrl.value = null;
    formData.value.image = '';
}

async function submitForm() {
    try {
        toast.success('리뷰가 성공적으로 등록되었습니다!');
        const response = await updateReview(
            initialData.reviewId,
            {
                detail: formData.value.detail,
                rating: rating.value,
            },
            authStore.accessToken
        );
        console.log(response);
        setTimeout(() => {
            router.push('/mypage/review');
        }, 1000);
    } catch (e) {
        toast.error('리뷰 수정에 실패하였습니다.');
    }

    console.log('리뷰 등록:', {
        rating: rating.value,
        content: formData.value.detail,
        // imageName: imageFile.value?.name ?? '선택된 사진 없음'
    });
}

const product = ref(null);

onMounted(() => {
    // 백엔드 연동 전 테스트용 데이터
    product.value = {
        image: 'https://lh6.googleusercontent.com/proxy/1uHquPsP1c1xFQS1mhj8KnhnrDSMBb5oTIFYMhRamlv7z0Ll7MdeHWBocJdh3sOV-JkavvuXSp_uY01jUtPLraHXghA5mIdLZHi6IXUhK4WbrM0FULC0lD9Sdylh8rRW63C9yaF4brNd1qcpy14Fzec',
        region: '충청남도 부여군',
        title: '백제문화단지 역사여행',
        date: '2025/04/15',
        price: 79000,
    };
    // 백엔드 연동 전 테스트용 데이터
    product.value = {
        image: 'https://lh6.googleusercontent.com/proxy/1uHquPsP1c1xFQS1mhj8KnhnrDSMBb5oTIFYMhRamlv7z0Ll7MdeHWBocJdh3sOV-JkavvuXSp_uY01jUtPLraHXghA5mIdLZHi6IXUhK4WbrM0FULC0lD9Sdylh8rRW63C9yaF4brNd1qcpy14Fzec',
        region: '충청남도 부여군',
        title: '백제문화단지 역사여행',
        date: '2025/04/15',
        price: 79000,
    };
});
</script>

<template>
    <div class="container py-4">
        <div class="mb-4">
            <h4 class="fw-bold fs-3 mb-4">이 상품 어떠셨나요?</h4>
            <div v-if="product" class="d-flex align-items-start gap-3 mb-4">
                <div
                    class="position-relative rounded overflow-hidden"
                    style="width: 280px; height: 190px">
                    <img
                        :src="product.image"
                        alt="상품 이미지"
                        class="w-100 h-100 object-fit-cover rounded" />
                    <span
                        class="position-absolute top-0 start-0 bg-dark bg-opacity-50 text-white px-2 py-1 small rounded-bottom-end"
                        style="font-size: 0.75rem">
                        {{ product.region }}
                    </span>
                </div>
                <div class="container py-4">
                    <div class="mb-4">
                        <h4 class="fw-bold fs-3 mb-4">이 상품 어떠셨나요?</h4>
                        <div v-if="product" class="d-flex align-items-start gap-3 mb-4">
                            <div
                                class="position-relative rounded overflow-hidden"
                                style="width: 280px; height: 190px">
                                <img
                                    :src="product.image"
                                    alt="상품 이미지"
                                    class="w-100 h-100 object-fit-cover rounded" />
                                <span
                                    class="position-absolute top-0 start-0 bg-dark bg-opacity-50 text-white px-2 py-1 small rounded-bottom-end"
                                    style="font-size: 0.75rem">
                                    {{ product.region }}
                                </span>
                            </div>

                            <div class="d-flex flex-column justify-content-center">
                                <p class="mb-1 fw-semibold fs-4">{{ product.title }}</p>
                                <p class="mb-1 text-muted fw-semibold fs-4">{{ product.date }}</p>
                                <p class="mb-0 fw-semibold fs-4">
                                    {{ product.price.toLocaleString() }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                        <p class="mb-1 fw-semibold fs-4">{{ product.title }}</p>
                        <p class="mb-1 text-muted fw-semibold fs-4">{{ product.date }}</p>
                        <p class="mb-0 fw-semibold fs-4">{{ product.price.toLocaleString() }}</p>
                    </div>
                </div>
            </div>

            <div class="d-flex gap-2 my-5">
                <svg
                    v-for="n in 5"
                    :key="n"
                    @click="setRating(n)"
                    @mouseover="hover = n"
                    @mouseleave="hover = 0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="50"
                    height="50"
                    :style="{
                        fill: n <= (hover || rating) ? '#FFDC3E' : '#E2E2E2',
                        stroke: n <= (hover || rating) ? '#FFDC3E' : 'none',
                        cursor: 'pointer',
                    }">
                    <polygon points="12,2 15,9 22,9 17,14 19,22 12,18 5,22 7,14 2,9 9,9" />
                </svg>
            </div>
            <div class="d-flex gap-2 my-5">
                <svg
                    v-for="n in 5"
                    :key="n"
                    @click="setRating(n)"
                    @mouseover="hover = n"
                    @mouseleave="hover = 0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="50"
                    height="50"
                    :style="{
                        fill: n <= (hover || rating) ? '#FFDC3E' : '#E2E2E2',
                        stroke: n <= (hover || rating) ? '#FFDC3E' : 'none',
                        cursor: 'pointer',
                    }">
                    <polygon points="12,2 15,9 22,9 17,14 19,22 12,18 5,22 7,14 2,9 9,9" />
                </svg>
            </div>

            <hr />
            <hr />

            <form @submit.prevent="submitForm">
                <div class="mb-3">
                    <h4 class="fw-bold fs-3 mt-4">어떤 점이 좋았나요?</h4>
                    <label for="review-content" class="form-label fw-bold">본문 입력 (필수)</label>
                    <textarea
                        id="review-content"
                        class="form-control mb-5 mt-2"
                        v-model="formData.detail"
                        rows="6"
                        placeholder="내용을 입력해주세요."></textarea>
                </div>

                <hr />
                <div class="my-4">
                    <h4 class="fw-bold fs-3 mb-4 d-block">사진 첨부</h4>
                    <label for="file" class="d-inline-block" style="cursor: pointer">
                        <div
                            v-if="imageUrl"
                            class="position-relative border rounded overflow-hidden"
                            style="width: 210px; height: 200px">
                            <img
                                :src="imageUrl"
                                alt="uploadedImage"
                                class="w-100 h-100 object-fit-cover border rounded" />
                            <button
                                type="button"
                                class="btn btn-light border-0 p-0 position-absolute top-0 end-0 m-1"
                                style="
                                    width: 28px;
                                    height: 28px;
                                    border-radius: 50%;
                                    background-color: rgba(0, 0, 0, 0.6);
                                "
                                @click.stop="removeImage">
                                <i class="bi bi-x-lg text-white" style="font-size: 0.9rem"></i>
                            </button>
                        </div>
                        <div
                            v-else
                            class="d-flex align-items-center justify-content-center border rounded bg-white"
                            style="width: 200px; height: 190px; transition: 0.3s"
                            @mouseover="
                                $event.currentTarget.style.boxShadow =
                                    '0 0 6px rgba(62,123,250,0.3)'
                            "
                            @mouseleave="$event.currentTarget.style.boxShadow = 'none'">
                            <img src="../../../../../assets/icons/camera.svg" alt="camera" />
                        </div>
                    </label>
                    <input id="file" type="file" accept="image/*" @change="handleImage" hidden />
                </div>

                <div class="text-center">
                    <button
                        type="submit"
                        class="btn"
                        :class="isFormValid ? 'btn-dark' : 'btn-secondary disabled'"
                        :disabled="!isFormValid"
                        style="width: 100px; height: 56px; border-radius: 10px">
                        {{ submitLabel }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.object-fit-cover {
    object-fit: cover;
    object-fit: cover;
}
</style>
