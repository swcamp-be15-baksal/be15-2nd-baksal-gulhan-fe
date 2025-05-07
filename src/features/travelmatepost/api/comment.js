import { api2 } from '@/plugins/axios'

/* 댓글 목록 조회 */
export const fetchComments = async (travelMatePostId, params) => {
  try {
    const response = await api2.get(`/comment/${travelMatePostId}`, { params })
    return response.data.data
  } catch (error) {
    console.error('댓글 목록 조회 실패:', error)
    throw error
  }
}

// 댓글 등록
export const createComment = async (accessToken, postId, commentData) => {
  try {
    await api2.post(`/comment/${postId}`, commentData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error('댓글 등록 실패:', error);
    throw error;
  }
};

// 댓글 수정
export const updateComment = async (commentId, content, accessToken) => {
  try {
    const res = await api2.put(`/comment/${commentId}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error('댓글 수정 실패:', err);
    throw err;
  }
};

// 댓글 삭제
export const deleteComment = async (commentId, accessToken) => {
  try {
    const res = await api2.delete(`/comment/${commentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error('댓글 삭제 실패:', err);
    throw err;
  }
};

