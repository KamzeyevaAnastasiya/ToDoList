import { baseResponseSchema } from '@/common/types'
import { z } from 'zod'

export const loginSchema = z.object({
  userId: z.number(),
  token: z.string(),
})
export const defaultLoginResponseSchema = baseResponseSchema(loginSchema)

export type DefaultLoginResponse = z.infer<typeof defaultLoginResponseSchema>
