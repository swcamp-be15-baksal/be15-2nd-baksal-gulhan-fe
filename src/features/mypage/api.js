import { api2 } from '@/plugins/axios.js';

// 회원 정보 조회
export function fetchUserInfo(accessToken) {
  return api2.get('/users/info', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });
}

// 회원 정보 수정
export function updateUserInfo(data, accessToken) {
  return api2.put('/users/info/update', data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });
}

// 회원 탈퇴
export function withdrawUser(accessToken) {
  return api2.get( `/users/withdraw`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
}

// 배송지 목록 조회
 export function getDeliveryAddress(accessToken) {
   return api2.get('/users/me/delivery-address', {
     headers: {
       Authorization: `Bearer ${accessToken}`,
     }
   });
 }

// 배송지 등록
export function createDeliveryAddress(accessToken, payload) {
  return api2.post('/users/delivery-address/register',
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
  });
}

// 배송지 수정
export function getDeliveryAddressById(accessToken, deliveryAddressId) {
  return api2.get(`/users/me/delivery-address/${deliveryAddressId}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
}

export function updateDeliveryAddress(accessToken, deliveryAddressId, data) {
  return api2.put(`/users/delivery-address/update/${deliveryAddressId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
}

// 배송지 삭제
export function deleteDeliveryAddress(accessToken, deliveryAddressId) {
  return api2.post( `/users/delivery-address/delete/${deliveryAddressId}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
  });
}

// 내 게시글 조회
export function fetchUserBoard(accessToken) {
  return api2.get('/users/me/board', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });
}

// 내 댓글 조회
export function fetchUserComment(accessToken) {
  return api2.get('/users/me/comment', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });
}

