import { request } from '@/utils/request'
import type { FieldType } from '@/types/registerFormType'
import type { ApiResponse } from '@/types/responseType';

export const registerAPI = (data:FieldType) => {
  return request<ApiResponse<null>>({
    url: '/auth/register',
    method: 'POST',
    data
  })
}