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
