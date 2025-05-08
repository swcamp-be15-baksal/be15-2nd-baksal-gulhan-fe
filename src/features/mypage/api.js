import { api, api2 } from '@/plugins/axios.js';
import { useAuthStore } from '@/stores/auth';

// 회원 정보 조회
export function fetchUserInfo(accessToken) {
  return api2.get('/users/info', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// 회원 정보 수정
export function updateUserInfo(data, accessToken) {
  return api2.put('/users/info/update', data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// 회원 탈퇴
export function withdrawUser(accessToken) {
  return api2.get(`/users/withdraw`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// 배송지 목록 조회
export function getDeliveryAddress(accessToken) {
  return api2.get('/users/me/delivery-address', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// 배송지 등록
export function createDeliveryAddress(accessToken, payload) {
  return api2.post('/users/delivery-address/register', payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// 배송지 수정
export function getDeliveryAddressById(accessToken, deliveryAddressId) {
  return api2.get(`/users/me/delivery-address/${deliveryAddressId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export function updateDeliveryAddress(accessToken, deliveryAddressId, data) {
  return api2.put(`/users/delivery-address/update/${deliveryAddressId}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// 배송지 삭제
export function deleteDeliveryAddress(accessToken, deliveryAddressId) {
  return api2.post(`/users/delivery-address/delete/${deliveryAddressId}`, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// 내 게시글 조회
export function fetchUserBoard(accessToken) {
  return api2.get('/users/me/board', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// 내 댓글 조회
export function fetchUserComment(accessToken) {
  return api2.get('/users/me/comment', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

// 좋아요 등록
export async function toggleLike(targetId, targetType) {
  const authStore = useAuthStore();
  const token = authStore.accessToken;

  if (!token) throw new Error('로그인이 필요합니다.');

  const payload = { targetId, targetType };

  console.log('[좋아요 요청]', payload);

  return api.post('/like/toggle', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
}

// 관심 목록 조회
export function fetchLikes(accessToken, params) {
  return api.get('/like/likes', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params,
  });
}

// 내 리뷰 조회

export async function fetchUserReviews(targetType = 'PACKAGE') {
  return await api.get('/users/me/review', {
    params: { targetType },
  });
}

// 특정 대상에 대한 좋아요 여부 확인
export async function fetchIsLiked(targetId, targetType) {
  return await api.get('/like/check', {
    params: {
      targetId,
      targetType,
    },
  });
}
