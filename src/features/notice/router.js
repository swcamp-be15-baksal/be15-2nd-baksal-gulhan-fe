export const noticeRoutes = [
    {
        path: '/notice', // 게시글 목록
        name: 'notice',
        component: () => import('@/features/notice/views/NoticeListView.vue'),
    },
    {
      path: '/notice/write', // 글쓰기
      name: 'NoticeWrite',
      component: () => import('@/features/notice/views/NoticeWriteView.vue'),
    }

];
