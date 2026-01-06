import { request } from '@/utils/request'
import type { FieldType } from '@/types/loginFormType'

export const loginAPI = (data: FieldType) => {
  return request({
    url: '/auth/login',
    method: 'POST',
    data
  })
}
