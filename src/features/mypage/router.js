export const mypageRoutes = [
  // 마이페이지 메인
  {
      path : '/mypage',
      name : 'MypageMain',
      component : () => import('@/features/mypage/views/MyPageMainView.vue')
  },
  // 회원 정보 조회
  {
    path : '/mypage/userinfo',
    name : 'UserInfo',
    component : () => import('@/features/mypage/views/UserInfoView.vue')
  },
  // 회원 정보 수정
  {
    path : '/mypage/userinfo/edit',
    name : 'UpdateUserInfo',
    component : () => import('@/features/mypage/views/UserInfoEditView.vue')
  },
  // 구매 내역 조회
  {
    path : '/mypage/orderhistory',
    name : 'OrderHistory',
    component : () => import('@/features/mypage/views/OrderHistoryView.vue')
  },
  // 리뷰 조회
  {
    path : '/mypage/review',
    name : 'Review',
    component : () => import('@/features/mypage/views/UserReviewView.vue')
  },
  // 동행글, 댓글 조회
  {
    path : '/mypage/post',
    name : 'Post',
    component : () => import('@/features/mypage/views/UserPostView.vue')
  },
  // 배송지 조회
  {
    path : '/mypage/deliveryaddress',
    name : 'DeliveryAddress',
    component : () => import('@/features/mypage/views/DeliveryAddressListView.vue')
  },
  // 배송지 등록
  {
    path : '/mypage/deliveryaddress/create',
    name : 'CreateDeliveryAddress',
    component : () => import('@/features/mypage/views/DeliveryAddressCreateView.vue')
  },
  // 배송지 수정
  {
    path : '/mypage/deliveryaddress/:deliveryAddressId/edit',
    name : 'UpdateDeliveryAddress',
    component : () => import('@/features/mypage/views/DeliveryAddressEditView.vue')
  },
  // 관심 조회
  {
    path : '/mypage/like',
    name : 'mypage',
    component : () => import('@/features/mypage/views/LikeListView.vue')
  }
]
