<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import TmpCommentForm from './TmpCommentForm.vue'
import { fetchComments, updateComment, deleteComment, } from '@/features/travelmatepost/api/comment.js'

const authStore = useAuthStore()
const route = useRoute()
const travelMatePostId = Number(route.params.id)

const comments = ref([])
const activeDropdownId = ref(null)
const showReplyForm = ref(null)
const editingCommentId = ref(null)
const replyContent = ref('')
const editContent = ref('')

const fetchCommentData = async () => {
  try {
    const res = await fetchComments(travelMatePostId)
    comments.value = res.commentDTO
  } catch (err) {
    console.error('댓글 조회 실패:', err)
  }
}

onMounted(fetchCommentData)

const filteredComments = computed(() =>
  comments.value.filter((c) => c.travelMatePostId === travelMatePostId)
)

const parentComments = computed(() =>
  filteredComments.value.filter((c) => c.parentCommentId === null)
)

const getChildComments = (parentId) => {
  return filteredComments.value.filter((c) => c.parentCommentId === parentId)
}

const isMyComment = (commentUserNo) => {
  return commentUserNo === authStore.userNo
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

const onEditSubmit = async (commentId) => {
  try {
    await updateComment(commentId, editContent.value, authStore.accessToken)
    await fetchCommentData()
    editingCommentId.value = null
    editContent.value = ''
  } catch (err) {
    alert('댓글 수정 실패')
  }
}

const onDelete = async (commentId) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    try {
      await deleteComment(commentId, authStore.accessToken)
      await fetchCommentData()
    } catch (err) {
      alert('댓글 삭제 실패')
    }
    activeDropdownId.value = null
  }
}

const onReplyClick = (commentId) => {
  showReplyForm.value = commentId
}

const onReplyCancel = () => {
  showReplyForm.value = null
}
</script>

<template>
  <div class="comment-section">
    <h3>댓글</h3>
    <div v-if="parentComments.length === 0" class="no-comment">댓글이 없습니다.</div>

    <div
      v-for="comment in parentComments"
      :key="comment.commentId"
      class="comment-card"
    >
      <div class="comment-header">
        <div class="left"><strong>{{ comment.userId }}</strong></div>
        <div class="right">
          <span class="date">{{ comment.createdAt }}</span>
          <button class="reply-button" @click="onReplyClick(comment.commentId)">답글쓰기</button>
        <!--   v-if="isMyComment(comment.userNo)"        -->
          <div class="menu-container">
            <span class="menu-btn" @click="toggleDropdown(comment.commentId)">⋯</span>
            <!-- v-if="activeDropdownId === comment.commentId"           -->
            <div class="dropdown-menu">
              <button @click="onEditClick(comment)">수정</button>
              <button @click="onDelete(comment.commentId)">삭제</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="editingCommentId === comment.commentId">
        <textarea v-model="editContent" class="comment-input" />
        <div class="reply-form-buttons">
          <button class="cancel-btn" @click="onEditCancel">취소</button>
          <button class="submit-btn" @click="() => onEditSubmit(comment.commentId)">등록</button>
        </div>
      </div>
      <div v-else class="comment-content">{{ comment.content }}</div>

      <div
        v-for="child in getChildComments(comment.commentId)"
        :key="child.commentId"
        class="child-comment"
      >
        <div class="comment-header">
          <div class="left"><strong>{{ child.userId }}</strong></div>
          <div class="right">
            <span class="date">{{ child.createdAt }}</span>
            <div v-if="isMyComment(child.userNo)" class="menu-container">
              <span class="menu-btn" @click="toggleDropdown(child.commentId)">⋯</span>
              <div v-if="activeDropdownId === child.commentId" class="dropdown-menu">
                <button @click="onEditClick(child)">수정</button>
                <button @click="onDelete(child.commentId)">삭제</button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="editingCommentId === child.commentId">
          <textarea v-model="editContent" class="comment-input" />
          <div class="reply-form-buttons">
            <button class="cancel-btn" @click="onEditCancel">취소</button>
            <button class="submit-btn" @click="() => onEditSubmit(child.commentId)">등록</button>
          </div>
        </div>
        <div v-else class="comment-content">{{ child.content }}</div>
      </div>

      <div v-if="showReplyForm === comment.commentId" class="reply-form">
        <TmpCommentForm
          :post-id="travelMatePostId"
          :parent-comment-id="comment.commentId"
          @submitted="fetchCommentData; onReplyCancel()"
        />
        <button class="cancel-btn" @click="onReplyCancel">종료</button>
      </div>
    </div>
  </div>
</template>

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
  background-color: white;
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
  min-width: 80px;
}
.dropdown-menu button {
  width: 100%;
  padding: 6px 1px;
  background: none;
  border: none;
  text-align: center;
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
.reply-form {
  margin-top: 12px;
}
.comment-input {
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
.reply-form-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  gap: 4px;
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
