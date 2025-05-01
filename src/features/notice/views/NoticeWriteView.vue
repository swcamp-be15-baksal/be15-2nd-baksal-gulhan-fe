<template>
  <div class="container">
    <div class="notice-title">
      <h2>공지사항</h2>
    </div>
    <div class="editor-page">
      <!-- 제목 입력창 -->
      <input
        v-model="title"
        type="text"
        placeholder="제목을 입력하세요."
        class="title-input"
      />

      <!-- 에디터 -->
      <div class="editor-wrapper">
        <div id="editor"></div>
      </div>

      <!-- 버튼 -->
      <div class="button-wrapper">
        <button class="cancel-btn" @click="onCancel">취소</button>
        <button class="submit-btn" @click="onSubmit">등록</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import QuillResize from 'quill-resize-module';

Quill.register('modules/resize', QuillResize);

const router = useRouter()
const title = ref('')
let quill

onMounted(() => {
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['link', 'image'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }]
  ]

  quill = new Quill('#editor', {
    modules: {
      toolbar: toolbarOptions,
      /* https://github.com/mudoo/quill-resize-module */
      resize: {
        parchment: {
          image: {
            attribute: ['width'],  // ['width', 'height']
            limit: {
              minWidth: 200,
              maxWidth: 1000,
              maxHeight: 1000,
            }
          }
        }
      },
    },
    theme: 'snow',
    placeholder: '  내용을 입력하세요.'
  })
})

const onCancel = () => {
  router.back() // 이전 페이지로 이동
}

const onSubmit = () => {
  const content = quill.root.innerHTML
  console.log('제목:', title.value)
  console.log('내용:', content)
}
</script>

<style scoped>
.container {
  padding: 40px 80px;
  background-color: #fffef9;
}

.notice-title h2 {
  font-size: 20px;
  margin-bottom: 16px;
}

.editor-page {
  width: 800px;
  margin: 40px auto;
  background: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.title-input {
  width: 100%;
  padding: 12px;
  font-size: 18px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.editor-wrapper {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 20px;
}

#editor {
  height: 400px;
  background: white;
  padding: 10px;
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
  background-color: #f5f5f5;
  color: #333;
  margin-right: 10px;
}

.submit-btn {
  background-color: #4caf50;
  color: white;
}

.cancel-btn:hover {
  background-color: #e0e0e0;
}

.submit-btn:hover {
  background-color: #45a049;
}
</style>
