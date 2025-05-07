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
export async function checkLike(targetId, targetType) {
  const authStore = useAuthStore();
  const token = authStore.accessToken;

  if (!token) throw new Error('로그인이 필요합니다.');

  const payload = { targetId, targetType };

  return api.get('/like/check', payload, {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ 명확히 추가
    },
    withCredentials: true,
  });
}

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

// 3. 특정 대상의 좋아요 수 조회
export const getTargetLikeCount = (params) =>
  api.get('/like/count', {
    params, // { targetId, targetType }
  });
