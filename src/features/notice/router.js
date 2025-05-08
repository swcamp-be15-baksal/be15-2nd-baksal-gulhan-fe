export const noticeRoutes = [
  {
    path: '/notice',
    name: 'NoticeList',
    component: () => import('@/features/notice/views/NoticeListView.vue')
  },
  {
    path: '/notice/write',
    name: 'NoticeWrite',
    component: () => import('@/features/notice/views/NoticeWriteView.vue')
  },
  {
    path: '/notice/:id',
    name: 'NoticeDetail',
    component: () => import('@/features/notice/views/NoticeDetailView.vue')
  },
  {
    path: '/notice/edit/:noticeId',
    name: 'NoticeEdit',
    component: () => import('@/features/notice/views/NoticeEditView.vue')
  }
];
