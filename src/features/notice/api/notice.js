import { api2 } from '@/plugins/axios.js'

/* 공지사항 목록 조회 */
export const fetchNoticeList = async (params) => {
  try {
    const response = await api2.get('/notice/list', { params })
    return response.data.data
  } catch (error) {
    console.error('공지사항 목록 조회 실패:', error)
    throw error
  }
}

/* 공지사항 상세 조회 */
export const fetchNoticeDetail = async (noticeId) => {
  try {
    const response = await api2.get(`/notice/list/${noticeId}`)
    return response.data.data // data.noticeDTO 형식
  } catch (error) {
    console.error('공지사항 상세 조회 실패:', error)
    throw error
  }
}

/* 공지사항 등록 */
export const createNotice = async (accessToken, noticeData) => {
  try {
    const response = await api2.post(
      '/notice/list',
      noticeData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.data; // 생성된 noticeId 반환
  } catch (error) {
    console.error('공지사항 등록 실패:', error);
    throw error;
  }
};

/* 공지사항 수정 */
export const updateNotice = async (noticeId, data, accessToken) => {
  try {
    const response = await api2.put(`/notice/list/${noticeId}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('공지사항 수정 실패:', error);
    throw error;
  }
};

/* 공지사항 삭제 */
export const deleteNotice = async (noticeId, accessToken) => {
  try {
    const response = await api2.delete(`/notice/list/${noticeId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('공지사항 삭제 실패:', error);
    throw error;
  }
};
