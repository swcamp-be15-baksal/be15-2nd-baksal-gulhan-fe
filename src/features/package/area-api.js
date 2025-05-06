import { api } from '@/plugins/axios.js';

// parentAreaId에 해당하는 하위 지역 목록 조회
export function fetchAreas(parentAreaId) {
    return api.get(`/s1/areas/list`, {
        params: { parentAreaId },
    });
}
