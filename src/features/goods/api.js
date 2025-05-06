import { api } from '@/plugins/axios.js';

// 기념품 목록 조회
export function fetchGoodsList(params) {
    return api.get('/s1/goods/list', { params });
}

// 기념품 상세 조회
export function fetchGoodsDetail(id) {
    return api.get(`/s1/goods/list/${id}`);
}
