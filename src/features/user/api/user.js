import { api2 } from '@/plugins/axios';

export function registerUser(data) {
    return api2.post('/users/register', data);
}

export function loginUser(data) {
    return api2.post('/auth/login', data);
}

export function logoutUser(accessToken) {
    return api2.post(
        '/auth/logout',
        {},
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        }
    );
}

export function refreshUserToken() {
    return api2.post('/auth/token/reissue');
}

export function findId(data) {
    return api2.post('/users/find/id', data);
}

export function findIdEmailVerify(data) {
    return api2.get('/users/find/id/verify', { params: data });
}

export function findPassword(data) {
    return api2.post('/users/find/password', data);
}

export function findPasswordEmailVerify(data) {
    return api2.post('/users/find/password/verify', data);
}

export function requestKakaoLogin(code) {
  return api2.get(`/oauth/kakao/callback?code=${code}`);
}

export function addKakaoAdditionalInfo(data) {
  return api2.post('/oauth/kakao/additional-info', data);
}

export function refreshKakaoToken(refreshToken) {
  return api2.post('/oauth/kakao/refresh', { refreshToken });
}

export function logoutKakaoUser({ userId, accessToken, refreshToken }) {
  return api2.post('/oauth/kakao/logout', {
    userId,
    accessToken,
    refreshToken
  });
}

export function withdrawKakaoUser({ userId, accessToken }) {
  return api2.post('/oauth/kakao/withdraw', {
    userId,
    accessToken
  });
}


