import { instance } from '@/common/instance'
import type { DefaultBaseResponse } from '@/common/types'
import type { DefaultLoginResponse } from '@/features/auth/api/authApi.types'
import type { LoginInputs } from '@/features/auth/lib/schemas'

export const authApi = {
  login(payload: LoginInputs) {
    return instance.post<DefaultLoginResponse>('/auth/login', payload)
  },
  logout() {
    return instance.delete<DefaultBaseResponse>('/auth/login')
  },
}
