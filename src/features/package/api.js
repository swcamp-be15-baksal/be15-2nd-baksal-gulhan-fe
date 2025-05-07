import { api } from '@/plugins/axios.js';
import { api2 } from '@/plugins/axios.js';
/** 패키지 목록 조회
 * {
  "area": "string",
  "title": "string",
  "startDate": "2025-05-06T06:10:46.284Z",
  "endDate": "2025-05-06T06:10:46.284Z",
  "page": 1073741824,
  "size": 1073741824,
  "limit": 1073741824,
  "offset": 1073741824,
  "sort": "string"
}
**/
export function fetchPackageList(params) {
    return api.get('/s1/packages/list', { params });
}

// 패키지 상세 조회
export function fetchPackageDetail(id) {
    return api.get(`/s1/packages/list/${id}`);
}

export async function createPackage(payload) {
    try {
        // 1. accessToken 확인
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) throw new Error('로그인이 필요합니다.');

        // 2. 사용자 정보 조회
        const userRes = await api2.get('/users/info', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const userInfo = userRes.data?.data;
        if (!userInfo || userInfo.rankId !== 1) {
            throw new Error('관리자만 패키지를 등록할 수 있습니다.');
        }

        // 3. 패키지 등록 요청 (토큰 자동 포함됨)
        return await api.post('/s1/packages', payload);
    } catch (err) {
        console.error('[createPackage] 등록 실패:', err.message || err);
        throw err;
    }
}
