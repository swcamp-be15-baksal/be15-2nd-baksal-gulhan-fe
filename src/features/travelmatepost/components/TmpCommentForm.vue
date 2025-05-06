<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { createComment } from '@/features/travelmatepost/api/comment.js'

const props = defineProps({
  postId: Number,
  parentCommentId: Number, // optional
})

const emit = defineEmits(['submitted', 'cancel'])

const authStore = useAuthStore()
const content = ref('')

const onSubmit = async () => {
  if (!content.value.trim()) {
    alert('댓글을 입력해주세요.')
    return
  }

  try {
    await createComment(authStore.accessToken, props.postId, {
      content: content.value,
      parentCommentId: props.parentCommentId || null,
    })
    content.value = ''
    emit('submitted')
  } catch (err) {
    console.error('댓글 등록 실패:', err)
  }
}

const onCancel = () => {
  content.value = ''
  emit('cancel')
}
</script>

<template>
  <div class="form-wrapper">
    <textarea
      v-model="content"
      placeholder="댓글을 남겨보세요"
      class="comment-input"
    />
    <div class="form-actions">
      <button class="cancel-btn" @click="onCancel">취소</button>
      <button class="submit-btn" @click="onSubmit">등록</button>
    </div>
  </div>
</template>

<style scoped>
.form-wrapper {
  margin-top: 12px;
  width: 100%;
}

.comment-input {
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  resize: vertical;
  font-size: 0.95rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
}

.cancel-btn,
.submit-btn {
  padding: 6px 14px;
  font-size: 0.875rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.cancel-btn {
  background-color: #f1f1f1;
}

.submit-btn {
  background-color: #75a9ff;
  color: white;
}
</style>
