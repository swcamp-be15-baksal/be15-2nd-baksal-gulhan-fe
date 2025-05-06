import { api } from '@/plugins/axios';

export function fetchReviews(targetType, targetId) {
    return api.get('/reviews', {
        params: { targetType, targetId },
    });
}
