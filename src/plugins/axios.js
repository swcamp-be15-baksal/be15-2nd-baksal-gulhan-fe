import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

const api2 = axios.create({
    baseURL: import.meta.env.VITE_AUTH_SERVER_LOCAL_URL,
    headers: {'Content-Type' : 'application/json'},
    withCredentials: true,   // HttpOnly Cookie 사용 시 설정하기!

})

export {api, api2};
