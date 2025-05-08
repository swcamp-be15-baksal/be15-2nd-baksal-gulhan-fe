import { api } from '@/plugins/axios.js';

/* 장바구니 품목 등록 -> data 어떻게 넣어야할까..*/
export function registerCart(){
  return api.post('/carts')
}

/* 장바구니 품목들 조회*/
export function getCarts(accessToken){
  return api.get(
    '/carts',
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
}

/* 특정 장바구니 품목 삭제*/
export function deleteMyCart(id){
  return api.delete(`/carts/${id}`)

}
/* 장바구니 품목 전체 삭제*/
export function deleteAllMyCart(){
  return api.delete('/carts')
}

/* 특정 장바구니 품목 조회(?) -> id 넘겨서 해당 상품으로..*/

/* 장바구니 품목 수량 수정*/
