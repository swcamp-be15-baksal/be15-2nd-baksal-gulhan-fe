import { api } from '@/plugins/axios';

export async function addToCartAPI(payload) {
    return await api.post('/carts', payload, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function fetchCartItemsAPI() {
    return await api.get('/carts');
}

export async function fetchPackageById(id) {
    return await api.get(`/packages/list/${id}`);
}

export async function fetchGoodsById(id) {
    return await api.get(`/goods/list/${id}`);
}

export async function updateCartItem(cartId, count) {
    return await api.put(
        `/carts/${cartId}`,
        { count },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
}

export async function deleteCartItem(cartId) {
    return await api.delete(`/carts/${cartId}`);
}

export async function clearCartAPI() {
    return await api.delete('/carts');
}
