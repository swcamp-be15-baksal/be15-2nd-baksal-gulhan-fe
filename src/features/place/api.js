import {api} from '@/plugins/axios';

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
export const toggleLike = (data) => api.post('/like/toggle', data);
