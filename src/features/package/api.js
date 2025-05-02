import api from '@/plugins/axios';

export const getPackages = (params) => api.get('s1/packages/list', { params });

export const getPackage = (id) => api.get(`s1/packages/list/${id}`);
