import { api2 } from '@/plugins/axios.js';

/* 동행글 목록 조회 */
export const fetchTmpList = async (params) => {
  try {
    const response = await api2.get('/board/list', { params })
    return response.data.data
  } catch (error) {
    console.error('동행글 목록 조회 실패:', error)
    throw error
  }
}

/* 동행글 상세 조회 */
export const fetchTmpDetail = async (travelMatePostId) => {
  try {
    const response = await api2.get(`/board/list/${travelMatePostId}`)
    return response.data.data // { tmpDetailDTO }
  } catch (error) {
    console.error('동행글 상세 조회 실패:', error)
    throw error
  }
}

// 동행글 작성
export const createTmpPost = async (accessToken, postData) => {
  try {
    const response = await api2.post('/board', postData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data; // travelMatePostId
  } catch (error) {
    console.error('동행글 등록 실패:', error);
    throw error;
  }
}

/* 동행글 수정 */
export const updateTmpPost = async (id, data, accessToken) => {
  try {
    await api2.put(`/board/list/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  } catch (err) {
    console.error('게시글 수정 실패:', err)
    throw err
  }
}

/* 동행글 삭제 */
export const deleteTmpPost = async (id, accessToken) => {
  try {
    await api2.delete(`/board/list/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  } catch (err) {
    console.error('게시글 삭제 실패:', err)
    throw err
  }
}

