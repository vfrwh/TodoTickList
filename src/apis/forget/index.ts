import { request } from '@/utils/request';
import type { FieldType } from '@/types/forgetPasswordFormType';

export const forgetPasswordAPI = (data: FieldType) => {
  return request({
    url: '/auth/forgot-password',
    method: 'POST',
    data
  })
}

export const getCaptachaAPI = () => {
  return request({
    url: '/auth/captacha',
    method: 'GET'
  })
}