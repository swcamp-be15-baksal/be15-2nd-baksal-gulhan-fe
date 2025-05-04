import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userId = ref('user01') // 현재 로그인한 유저라고 가정

  return { userId }
})
