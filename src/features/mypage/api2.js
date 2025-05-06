import { api2, api } from '@/plugins/axios.js';

// 회원 리뷰 조회
export function fetchUserReview(accessToken, data) {
    return api2.get('/users/me/review', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        params: data,
    });
}

// 리뷰 수정
export function updateReview(reviewId, data, accessToken) {
    return api.put(
        `/review/${reviewId}`,
        {...data},
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
}

export function deleteReview(reviewId, accessToken){
  return api.delete(
    `review/${reviewId}`,
    {
      headers:{
        Authorization: `Bearer ${accessToken}`,
      }
    }
  )
}
