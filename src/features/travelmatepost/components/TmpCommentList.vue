<template>
  <div class="comment-section">
    <h3>댓글</h3>
    <div v-if="parentComments.length === 0" class="no-comment">댓글이 없습니다.</div>

    <div v-for="comment in parentComments" :key="comment.commentId" class="comment-card">
      <div class="comment-header">
        <div class="left"><strong>{{ comment.userId }}</strong></div>
        <div class="right">
          <span class="date">{{ comment.createdAt }}</span>
          <button class="reply-button" @click="onReplyClick(comment.commentId)">답글쓰기</button>
          <div class="menu-container">
            <span class="menu-btn" @click="toggleDropdown(comment.commentId)">⋯</span>
            <div v-if="activeDropdownId === comment.commentId" class="dropdown-menu">
              <button @click="onEditClick(comment)">수정</button>
              <button @click="onDelete(comment.commentId)">삭제</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="editingCommentId === comment.commentId">
        <textarea v-model="editContent" />
        <div class="reply-form-buttons">
          <button class="cancel-btn" @click="onEditCancel">취소</button>
          <button class="submit-btn" @click="onEditSubmit">등록</button>
        </div>
      </div>
      <div v-else class="comment-content">{{ comment.content }}</div>

      <div v-for="child in getChildComments(comment.commentId)" :key="child.commentId" class="child-comment">
        <div class="comment-header">
          <div class="left"><strong>{{ child.userId }}</strong></div>
          <div class="right">
            <span class="date">{{ child.createdAt }}</span>
            <div class="menu-container">
              <span class="menu-btn" @click="toggleDropdown(child.commentId)">⋯</span>
              <div v-if="activeDropdownId === child.commentId" class="dropdown-menu">
                <button @click="onEditClick(child)">수정</button>
                <button @click="onDelete(child.commentId)">삭제</button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="editingCommentId === child.commentId">
          <textarea v-model="editContent" />
          <div class="reply-form-buttons">
            <button class="cancel-btn" @click="onEditCancel">취소</button>
            <button class="submit-btn" @click="onEditSubmit">등록</button>
          </div>
        </div>
        <div v-else class="comment-content">{{ child.content }}</div>
      </div>

      <div v-if="showReplyForm === comment.commentId" class="reply-form">
        <textarea v-model="replyContent" placeholder="댓글을 남겨보세요" />
        <div class="reply-form-buttons">
          <button class="cancel-btn" @click="onReplyCancel">취소</button>
          <button class="submit-btn">등록</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import comments from '@/features/travelmatepost/mock/comment.json'
import { useRoute } from 'vue-router'

const route = useRoute()
const travelMatePostId = Number(route.params.id)
const showReplyForm = ref(null)
const replyContent = ref('')
const editingCommentId = ref(null)
const editContent = ref('')
const activeDropdownId = ref(null)

const filteredComments = computed(() =>
  comments.filter((c) => c.travelMatePostId === travelMatePostId)
)

const parentComments = computed(() =>
  filteredComments.value.filter((c) => c.parentCommentId === null)
)

const getChildComments = (parentId) => {
  return filteredComments.value.filter((c) => c.parentCommentId === parentId)
}

const onReplyClick = (parentId) => {
  showReplyForm.value = parentId
  replyContent.value = ''
}

const onReplyCancel = () => {
  showReplyForm.value = null
  replyContent.value = ''
}

const toggleDropdown = (commentId) => {
  activeDropdownId.value = activeDropdownId.value === commentId ? null : commentId
}

const onEditClick = (comment) => {
  editingCommentId.value = comment.commentId
  editContent.value = comment.content
  activeDropdownId.value = null
}

const onEditCancel = () => {
  editingCommentId.value = null
  editContent.value = ''
}

const onEditSubmit = () => {
  alert('수정 완료 (더미 데이터 반영은 생략됨)')
  editingCommentId.value = null
}

const onDelete = (commentId) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    alert(`댓글 ID ${commentId} 삭제 완료 (실제 삭제는 생략됨)`)
    activeDropdownId.value = null
  }
}
</script>

<style scoped>
.comment-section {
  margin-top: 40px;
}

.comment-section h3 {
  font-size: 1rem;
}

.no-comment {
  padding: 12px;
  font-size: 1rem;
  color: #666;
}

.comment-card {
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 6px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.left {
  font-size: 1rem;
}

.right {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.875rem;
  color: #777;
  position: relative;
}

.date {
  font-size: 0.875rem;
  color: #999;
}

.reply-button {
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
  font-size: 0.875rem;
}

.menu-container {
  position: relative;
}

.menu-btn {
  cursor: pointer;
  font-size: 1rem;
  padding: 0 6px;
}

.dropdown-menu {
  position: absolute;
  top: 28px;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  z-index: 100;
}

.dropdown-menu button {
  width: 100%;
  padding: 6px 12px;
  background: none;
  border: none;
  text-align: left;
  font-size: 0.75rem;
  cursor: pointer;
}

.dropdown-menu button:hover {
  background-color: #f5f5f5;
}

.comment-content {
  font-size: 1rem;
  padding-left: 4px;
}

.child-comment {
  margin-left: 24px;
  border-left: 2px solid #eee;
  padding-left: 16px;
  margin-top: 10px;
}

.reply-form,
textarea {
  margin-top: 12px;
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.reply-form-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  gap: 10px;
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
