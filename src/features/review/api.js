import { api } from '@/plugins/axios.js';

export function fetchReviews(targetId, targetType) {
    return api.get('/review', {
        params: {
            targetId,
            targetType,
        },
    });
}
