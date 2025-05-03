<script setup>
import router from '@/router/index.js';
import { toast } from 'vue3-toastify';

const props = defineProps({
  review: {
    type: Object,
    required: true,
  },
});

function goToEdit() {
  router.push(`/mypage/review/${props.review.id}/edit`);
}

function handleDelete() {
  const confirmed = window.confirm('정말 이 리뷰를 삭제하시겠습니까?');

  if (confirmed) {
    console.log('리뷰 삭제됨:', props.review.id);
    toast.success('리뷰가 삭제되었습니다.');
  }
}

</script>

<template>
  <div
    class="border pt-4 ps-4 pe-4 mb-5 position-relative bg-white rounded-2 mx-auto"
    style="width: 700px; min-width: 700px; max-width: 700px;"
  >
    <div class="position-absolute top-0 end-0 p-3 d-flex gap-2">
      <img
        src="@/assets/icons/edit.svg"
        alt="edit"
        style="cursor: pointer; width: 35px; height: 35px;"
        @click="goToEdit"
      />
      <img
        src="@/assets/icons/delete.svg"
        alt="delete"
        style="cursor: pointer; width: 35px; height: 35px;"
        @click="handleDelete"
      />
    </div>
    <p class="text-muted">No.{{ review.id }}</p>
    <h4 class="fw-bold">{{ review.title }}</h4>
    <div class="d-flex my-3">
      <svg
        v-for="n in 5"
        :key="n"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="me-2"
      >
        <path
          d="M11.0732 2.00879C11.5082 0.670135 13.3564 0.628057 13.8799 1.88281L13.9268 2.00879L15.5049 6.86426V6.86523C15.8188 7.83063 16.6817 8.50364 17.6807 8.58398L17.8818 8.5918H22.9883C24.3959 8.59192 25.0066 10.3371 23.9746 11.2227L23.8701 11.3057L19.7393 14.3066C18.9177 14.9035 18.5439 15.9331 18.7764 16.9082L18.8311 17.1025L20.4082 21.958C20.8432 23.2966 19.373 24.4173 18.2119 23.71L18.1006 23.6357L13.9697 20.6338C13.1482 20.0369 12.0538 20.0001 11.1982 20.5225L11.0303 20.6338L6.89941 23.6357C5.76056 24.4627 4.24114 23.4099 4.55566 22.0869L4.5918 21.958L6.16895 17.1025C6.48277 16.1367 6.18027 15.0839 5.41895 14.4316L5.26074 14.3066L1.12988 11.3057C-0.00857485 10.4782 0.522802 8.70771 1.87793 8.59766L2.01172 8.5918H7.11816C8.13352 8.5917 9.04067 7.97912 9.42578 7.05371L9.49512 6.86426L11.0732 2.00879Z"
          :fill="n <= review.rating ? '#FFDC3E' : '#FFFDF8'"
          stroke="black"
        />
      </svg>
    </div>
    <div class="d-flex gap-3">
      <img
        :src="review.image"
        alt="리뷰 이미지"
        class="rounded"
        style="width: 180px; height: 180px; object-fit: cover; flex-shrink: 0;"
      />
      <p class="mb-0">{{ review.content }}</p>
    </div>
    <p class="text-muted text-end mt-2">{{ review.date }}</p>
  </div>
</template>

