<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import QuillEditor from '@/components/common/QuillEditor.vue'
import { updateNotice } from '@/features/notice/api/notice'
import { useAuthStore } from '@/stores/auth'
import { fetchNoticeDetail } from '@/features/notice/api/notice'

const router = useRouter()
const route = useRoute()
const noticeId = Number(route.params.noticeId)

const title = ref('')
const content = ref('')
const authStore = useAuthStore()

onMounted(async () => {
  try {
    const res = await fetchNoticeDetail(noticeId)
    title.value = res.noticeDTO.title
    content.value = res.noticeDTO.content
  } catch (e) {
    alert('공지사항 데이터를 불러오지 못했습니다.', e)
    router.back()
  }
})

const onCancel = () => {
  router.back()
}

const onSubmit = async () => {
  try {
    await updateNotice(
      noticeId,
      {
        title: title.value,
        content: content.value
      },
      authStore.accessToken
    )
    alert('수정 완료!')
    router.push(`/notice/${noticeId}`)
  } catch (e) {
    alert('수정 실패! 다시 시도해 주세요.',e)
  }
}
</script>

<template>
  <div class="container">
    <div class="notice-title">
      <h2>공지사항 수정</h2>
    </div>
    <div class="editor-page">
      <input
        v-model="title"
        type="text"
        placeholder="제목을 입력하세요."
        class="title-input"
      />
      <QuillEditor v-model="content" />
      <div class="button-wrapper">
        <button class="cancel-btn" @click="onCancel">취소</button>
        <button class="submit-btn" @click="onSubmit">수정 완료</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  padding: 40px 100px;
  box-sizing: border-box;
  background-color: #fffef9;
}

.notice-title h2 {
  font-size: 20px;
  margin-bottom: 16px;
  margin-left: 60px;
}

.editor-page {
  width: 100%;
  max-width: 1000px;
  margin: 40px auto;
  background: #fff;
  padding: 30px 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
}

.title-input {
  width: 100%;
  padding: 12px;
  font-size: 18px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.button-wrapper {
  text-align: right;
}

.cancel-btn,
.submit-btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #E57575;
  color: white;
  margin-right: 10px;
}

.submit-btn {
  background-color: #75A9FF;
  color: white;
}

.cancel-btn:hover,
.submit-btn:hover {
  background-color: #e0e0e0;
}
</style>
