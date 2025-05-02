<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import notices from '@/features/notice/mock/notice.json'
import QuillEditor from '@/components/common/QuillEditor.vue'

const router = useRouter()
const route = useRoute()
const noticeId = Number(route.params.noticeId)

const title = ref('')
const content = ref('')

onMounted(() => {
  const target = notices.find(n => n.noticeId === noticeId)
  if (target) {
    title.value = target.title
    content.value = target.content
  }
})

const onCancel = () => {
  router.back()
}

const onSubmit = () => {
  alert('수정 완료됨 (실제 저장은 안 됨)')
  router.push('/notice')
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
