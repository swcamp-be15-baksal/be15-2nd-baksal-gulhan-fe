import { api } from '@/plugins/axios.js';

export const getNoticeList = (params = {}) => {
  return api.get('/notice/list', { params })
}
