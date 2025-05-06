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

