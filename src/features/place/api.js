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

export function getPlaceDetail(placeId){
  return api.get(`/place/${placeId}`)
}

export function getLike(params){
  return api.get(`/like/likes`, params)
}
