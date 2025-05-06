import { api } from '@/plugins/axios.js';

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
