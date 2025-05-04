<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import QuillEditor from '@/components/common/QuillEditor.vue';

const router = useRouter()
const title = ref('')
const content = ref('')

const onCancel = () => {
  router.back()
}

const onSubmit = () => {
  if (!title.value || !content.value) {
    alert('제목과 내용을 모두 입력해주세요.')
    return
  }
  alert('동행글이 등록되었습니다 (임시 구현)')
  router.push('/board')
}
</script>

<template>
  <div class="container">
    <div class="notice-title">
      <h2>동행글 작성</h2>
    </div>

    <div class="editor-page">
      <!-- 제목 입력 -->
      <input
        v-model="title"
        type="text"
        placeholder="제목을 입력하세요."
        class="title-input"
      />

      <!-- Quill 에디터 -->
      <QuillEditor v-model="content" />

      <!-- 버튼 -->
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
