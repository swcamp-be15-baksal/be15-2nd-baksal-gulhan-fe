import { api, api2 } from '@/plugins/axios.js';
import { useAuthStore } from '@/stores/auth';

/**
 * 패키지 목록 조회
 * @param {Object} params - 필터링/정렬/페이징 파라미터
 * {
 *   area: "서울특별시 강남구",
 *   title: "문화",
 *   startDate: "2025-05-01T00:00:00",
 *   endDate: "2025-05-31T23:59:59",
 *   page: 1,
 *   size: 20,
 *   sort: "like"
 * }
 */
export function fetchPackageList(params) {
    return api.get('/packages/list', { params });
}

/**
 * 패키지 상세 조회
 * @param {number|string} id - 패키지 ID
 */
export function fetchPackageDetail(id) {
    return api.get(`/packages/list/${id}`);
}

/**


/** 패키지 등록 요청 */
export async function createPackage(payload) {
    try {
        const authStore = useAuthStore();
        let accessToken = authStore.accessToken;

        if (!accessToken) {
            throw new Error('로그인이 필요합니다.');
        }

        // 사용자 정보 조회 (토큰 유효성 검증)
        const userRes = await api2.get('/users/info', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const userInfo = userRes.data?.data;
        console.log('[createPackage] 사용자 정보:', userInfo);

        if (!userInfo || userInfo.rankName !== 'SLAVE') {
            throw new Error('관리자만 패키지를 등록할 수 있습니다.');
        }

        console.log('[createPackage] 전송 payload:', payload);

        // 실제 패키지 등록 API 요청
        const res = await api.post('/packages', payload, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        return res;
    } catch (err) {
        if (err.response) {
            console.error('[createPackage] 등록 실패:', err.message);
            console.error('[서버 응답 상태]:', err.response.status);
            console.error('[서버 응답 본문]:', JSON.stringify(err.response.data, null, 2));

            if (err.response.data?.errorCode === '11003') {
                const authStore = useAuthStore();
                await authStore.clearAuth();
                alert('세션이 만료되었습니다. 다시 로그인해주세요.');
                location.href = '/login'; // 또는 router.push('/login');
            }
        } else {
            console.error('[createPackage] 알 수 없는 오류:', err);
        }
        throw err;
    }
}

export function updatePackage(packageId, payload) {
    return api.put(`/packages/${packageId}`, payload);
}

export async function deletePackage(packageId) {
    try {
        const authStore = useAuthStore();
        const accessToken = authStore.accessToken;

        if (!accessToken) {
            throw new Error('로그인이 필요합니다.');
        }

        const res = await api.delete(`/packages/list/${packageId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });

        return res;
    } catch (err) {
        if (err.response) {
            console.error('[deletePackage] 삭제 실패:', err.message);
            console.error('[서버 응답 상태]:', err.response.status);
            console.error('[서버 응답 본문]:', JSON.stringify(err.response.data, null, 2));

            if (err.response.data?.errorCode === '11003') {
                const authStore = useAuthStore();
                await authStore.clearAuth();
                alert('세션이 만료되었습니다. 다시 로그인해주세요.');
                location.href = '/login';
            }
        } else {
            console.error('[deletePackage] 알 수 없는 오류:', err);
        }
        throw err;
    }
}
