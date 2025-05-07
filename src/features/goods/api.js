import { api } from '@/plugins/axios.js';
import { api2 } from '@/plugins/axios.js';

// 기념품 목록 조회
export function fetchGoodsList(params) {
    return api.get('/s1/goods/list', { params });
}

// 기념품 상세 조회
export function fetchGoodsDetail(id) {
    return api.get(`/s1/goods/list/${id}`);
}

export async function createGoods(payload) {
    try {
        // 1. 사용자 정보 확인 (api2는 자동 토큰 설정 X)
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) throw new Error('로그인이 필요합니다.');

        const userRes = await api2.get('/users/info', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const userInfo = userRes.data?.data;
        if (userInfo?.rankId !== 1) {
            throw new Error('관리자만 등록할 수 있습니다.');
        }

        // 2. 등록 요청은 api 사용 (토큰 자동 포함)
        return await api.post('/s1/goods', payload);
    } catch (err) {
        console.error('[createGoods] 등록 실패:', err.message || err);
        throw err;
    }
}
