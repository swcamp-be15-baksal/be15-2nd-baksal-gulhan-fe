import PackageListView from '@/features/package/views/PackageListView.vue';
import PackageDetailView from '@/features/package/views/PackageDetailView.vue';
import PackageWriteView from '@/features/package/views/PackageWriteView.vue';

export const packageRoutes = [
    {
        path: '/packages/:id',
        name: 'package-detail',
        component: PackageDetailView,
    },
    {
        path: '/packages',
        name: 'package-list',
        component: PackageListView,
    },
    {
        path: '/packages/write',
        name: 'packages-write',
        component: PackageWriteView,
    },
];
