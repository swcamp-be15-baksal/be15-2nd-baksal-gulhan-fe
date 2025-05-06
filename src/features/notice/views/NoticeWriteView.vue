<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import QuillEditor from '@/components/common/QuillEditor.vue'
import { useAuthStore } from '@/stores/auth'
import { createNotice } from '@/features/notice/api/notice'

const router = useRouter()
const title = ref('')
const content = ref('')

const authStore = useAuthStore()

const onCancel = () => {
  router.back()
}

const onSubmit = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    alert('제목과 내용을 모두 입력해주세요.')
    return
  }

  try {
    const accessToken = authStore.accessToken
    const payload = {
      title: title.value,
      content: content.value,
    }

    await createNotice(accessToken, payload)

    alert('등록 완료')
    router.push('/notice')
  } catch (err) {
    console.error(err)
    alert('공지사항 등록에 실패했습니다.')
  }
}
</script>

<template>
  <div class="container">
    <div class="notice-title">
      <h2>공지사항</h2>
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
        <button class="submit-btn" @click="onSubmit">등록</button>
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
  font-size: 1.25rem;
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
  font-size: 1.125rem;
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
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #e57575;
  color: white;
  margin-right: 10px;
}

.submit-btn {
  background-color: #75a9ff;
  color: white;
}

.cancel-btn:hover,
.submit-btn:hover {
  background-color: #e0e0e0;
}
</style>
