import { request } from '@/utils'

export const getListAPI = (page:number) => {
  return request({
    url:`https://660d2bd96ddfa2943b33731c.mockapi.io/api/users/?page=${page}&limit=10`,
    method:'GET'
  })
}