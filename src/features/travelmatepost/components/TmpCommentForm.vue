<script setup>
import { ref } from 'vue'

const props = defineProps({
  postId: {
    type: Number,
    required: true
  },
  parentCommentId: {
    type: Number,
    default: null
  },
})

const content = ref('')

const emit = defineEmits(['submit'])

const onSubmit = () => {
  if (!content.value.trim()) {
    alert('내용을 입력해주세요.')
    return
  }

  const newComment = {
    commentId: Date.now(), // 예시용
    travelMatePostId: props.postId,
    parentCommentId: props.parentCommentId,
    userId: 'currentUser', // 실제 구현 시 로그인 유저로 교체
    createdAt: new Date().toISOString(),
    content: content.value
  }

  emit('submit', newComment)
  content.value = ''
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
      <button class="submit-btn" @click="onSubmit">등록</button>
    </div>
  </div>
</template>

<style scoped>
.form-wrapper {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  background: #fff;
  margin-top: 12px;
}

.comment-input {
  width: 100%;
  height: 80px;
  border: none;
  outline: none;
  resize: none;
  font-size: 1rem;
  background: transparent;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

.submit-btn {
  padding: 6px 12px;
  font-size: 0.875rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn {
  background-color: #75A9FF;
  color: white;
}
</style>
