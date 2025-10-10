import { request } from "@/utils"
import type { HabitFormTypes } from "@/types/HabitFormType"

export const changeHabitAPI = (data:HabitFormTypes) => {
  return request({
    url:'',
    method:"POST",
    data
  })
}

export const addHabitAPI = (data:HabitFormTypes) => {
  return request({
    url:'',
    method:"POST",
    data
  })
}