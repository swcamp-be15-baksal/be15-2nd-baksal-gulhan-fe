import { api } from '@/plugins/axios.js';
import { useAuthStore } from '@/stores/auth';

// 기념품 목록 조회
export function fetchGoodsList(params) {
    return api.get('/goods/list', { params });
}

// 기념품 상세 조회
export function fetchGoodsDetail(id) {
    return api.get(`/goods/list/${id}`);
}

export async function createGoods(payload) {
    try {
        const authStore = useAuthStore();
        const token = authStore.accessToken;
        if (!token) throw new Error('로그인이 필요합니다.');

        // 사용자 인증 헤더 설정
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        console.log('[createGoods] 전송 payload:', payload);
        const res = await api.post('/goods', payload, { headers });

        return res;
    } catch (err) {
        console.error('[createGoods] 등록 실패:', err);
        throw err;
    }
}
// 기념품 수정
export async function updateGoods(goodsId, payload) {
    try {
        const authStore = useAuthStore();
        const token = authStore.accessToken;
        if (!token) throw new Error('로그인이 필요합니다.');

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        console.log('[updateGoods] 전송 payload:', payload);
        const res = await api.put(`/goods/list/${goodsId}`, payload, { headers });

        return res;
    } catch (err) {
        console.error('[updateGoods] 수정 실패:', err);
        throw err;
    }
}

// 기념품 삭제
export async function deleteGoods(goodsId) {
    try {
        const authStore = useAuthStore();
        const token = authStore.accessToken;

        if (!token) {
            throw new Error('로그인이 필요합니다.');
        }

        const res = await api.delete(`/goods/list/${goodsId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });

        return res;
    } catch (err) {
        if (err.response) {
            console.error('[deleteGoods] 삭제 실패:', err.message);
            console.error('[서버 응답 상태]:', err.response.status);
            console.error('[서버 응답 본문]:', JSON.stringify(err.response.data, null, 2));

            if (err.response.data?.errorCode === '11003') {
                const authStore = useAuthStore();
                await authStore.clearAuth();
                alert('세션이 만료되었습니다. 다시 로그인해주세요.');
                location.href = '/login';
            }
        } else {
            console.error('[deleteGoods] 알 수 없는 오류:', err);
        }
        throw err;
    }
}
