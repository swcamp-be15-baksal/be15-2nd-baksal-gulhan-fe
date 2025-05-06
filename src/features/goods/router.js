import GoodsListView from '@/features/goods/views/GoodsListView.vue';
import GoodsDetailView from '@/features/goods/views/GoodsDetailView.vue';
import GoodsWriteView from '@/features/goods/views/GoodsWriteView.vue';
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
    {
        path: '/goods/write',
        name: 'goods-write',
        component: GoodsWriteView,
    },
];
