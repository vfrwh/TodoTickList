import { request } from '@/utils'
import type { DrawerFormTypes } from '@/types/listDrawerDetailsType'

export const getListAPI = (page:number) => {
  return request({
    url:`https://660d2bd96ddfa2943b33731c.mockapi.io/api/users/?page=${page}&limit=10`,
    method:'GET'
  })
}

export const deletListAPI = (data:{id:number}) => {
  return request({
    url:'',
    method:"DELETE",
    data
  })
}

export const changeListAPI = (data:DrawerFormTypes) => {
  return request({
    url:'',
    method:"POST",
    data
  })
}

export const addListAPI = (data:DrawerFormTypes) => {
  return request({
    url:'',
    method:"POST",
    data
  })
}