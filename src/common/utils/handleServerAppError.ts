import { setAppErrorAC, setAppStatusAC } from '@/app/app-slice'
import type { FieldError } from '@/common/types'
import type { Dispatch } from '@reduxjs/toolkit'

type BaseResponse<T = {}> = {
  data: T
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
}

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC({ error: data.messages[0] }))
  } else {
    dispatch(setAppErrorAC({ error: 'Some error occurred' }))
  }
  dispatch(setAppStatusAC({ status: 'failed' }))
}
