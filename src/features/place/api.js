import { api } from '@/plugins/axios.js';

// 장소 목록 조회
export function fetchPlaceList(params) {
  return api.get('/places', { params });
}
