import api from '@/plugins/axios';

export const getPlaces = (params) => api.get('s1/place/places', { params });
