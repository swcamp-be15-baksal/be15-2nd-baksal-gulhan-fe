import {api} from '@/plugins/axios';
import { useAuthStore } from '@/stores/auth.js';

export function getParentArea(){
  return api.get("/areas/list")
}

export function getChildArea(parentAreaId){
  return api.get(`/areas/list?parentAreaId=${parentAreaId}`)
}

export function getPlaces(params){
  return api.get(`/place/places?`, {params: params})
}

export function getPlaceDetail(placeId) {
  return api.get(`/place/placeDetail/${placeId}`);
}

// 좋아요 여부 단건 확인
export const checkLike = (params) => api.get('/like/check', { params });

export const getLike = (params) => api.get('/like/likes', { params });

// 좋아요 토글
export async function toggleLike(targetId, targetType) {
  const authStore = useAuthStore();
  const token = authStore.accessToken;

  if (!token) throw new Error('로그인이 필요합니다.');

  const payload = { targetId, targetType };

  console.log('[좋아요 요청]', payload);

  return api.post('/like/toggle', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
}
