export const mypageRoutes = [
  // 마이페이지 메인
  {
      path : '/mypage',
      name : 'MypageMain',
      component : () => import('@/features/mypage/views/main/MyPageMainView.vue')
  },
  // 회원 정보 조회
  {
    path : '/mypage/userinfo',
    name : 'UserInfo',
    component : () => import('@/features/mypage/views/userinfo/UserInfoView.vue')
  },
  // 회원 정보 수정
  {
    path : '/mypage/userinfo/edit',
    name : 'UpdateUserInfo',
    component : () => import('@/features/mypage/views/userinfo/UserInfoEditView.vue')
  },
  // 구매 내역 조회
  {
    path : '/mypage/orderhistory',
    name : 'OrderHistory',
    component : () => import('@/features/mypage/views/payment/OrderHistoryView.vue')
  },
  // 구매 내역 상세 조회
  {
    path : '/mypage/orderhistory/Detail/:id',
    name : 'OrderHistoryDetail',
    component : () => import('@/features/mypage/views/payment/OrderHistoryDetailView.vue')
  },
  // 리뷰 조회
  {
    path : '/mypage/review',
    name : 'Review',
    component : () => import('@/features/mypage/views/review/ReviewListView.vue')
  },
  // 리뷰 등록
  {
    path : '/mypage/review/create',
    name : 'CreateReview',
    component : () => import('@/features/mypage/views/review/ReviewCreateView.vue')
  },
  // 리뷰 삭제
  {
    path : '/mypage/review/:reviewId/edit',
    name : 'UpdateReview',
    component : () => import('@/features/mypage/views/review/ReviewEditView.vue')
  },
  // 동행글, 댓글 조회
  {
    path : '/mypage/post',
    name : 'Post',
    component : () => import('@/features/mypage/views/post/UserPostView.vue')
  },
  // 배송지 조회
  {
    path : '/mypage/deliveryaddress',
    name : 'DeliveryAddress',
    component : () => import('@/features/mypage/views/deliveryaddress/DeliveryAddressListView.vue')
  },
  // 배송지 등록
  {
    path : '/mypage/deliveryaddress/create',
    name : 'CreateDeliveryAddress',
    component : () => import('@/features/mypage/views/deliveryaddress/DeliveryAddressCreateView.vue')
  },
  // 배송지 수정
  {
    path : '/mypage/deliveryaddress/:deliveryAddressId/edit',
    name : 'UpdateDeliveryAddress',
    component : () => import('@/features/mypage/views/deliveryaddress/DeliveryAddressEditView.vue')
  },
  // 관심 조회
  {
    path : '/mypage/like',
    name : 'mypage',
    component : () => import('@/features/mypage/views/LikeListView.vue')
  }
]
