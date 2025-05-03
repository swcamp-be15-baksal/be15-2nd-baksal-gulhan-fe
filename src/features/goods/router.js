import GoodsListView from '@/features/goods/views/GoodsListView.vue';
import GoodsDetailView from '@/features/goods/views/GoodsDetailView.vue';

export const goodsRoutes = [
    {
        path: '/goods/:id',
        name: 'goods-detail',
        component: GoodsDetailView,
    },
    {
        path: '/goods',
        name: 'goods-list',
        component: GoodsListView,
    },
];
