import PackageListView from '@/features/package/views/PackageListView.vue';
import PackageDetailView from '@/features/package/views/PackageDetailView.vue';

export const packageRoutes = [
    {
        path: '/packages/:id', // 나중에 id 포함된 url로 변경할 듯 /packages/:id
        name: 'packages/:id',
        component: PackageDetailView,
    },
    {
        path: '/packages',
        name: 'packages',
        component: PackageListView,
    },
];
