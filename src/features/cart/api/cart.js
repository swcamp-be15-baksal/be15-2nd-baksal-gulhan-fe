import { api } from '@/plugins/axios.js';

export function registerCart(){
  return api.post('/')
}
