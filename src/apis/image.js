import { imageApi } from '@/plugins/axios.js';

export function uploadTempImage(data) {
    return imageApi.post('/image/temp', data);
}
