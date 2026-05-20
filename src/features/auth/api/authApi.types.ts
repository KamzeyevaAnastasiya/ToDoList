import { baseResponseSchema } from '@/common/types'
import { z } from 'zod'

export const loginSchema = z.object({
  userId: z.number(),
  token: z.string(),
})

export const loginResponseSchema = baseResponseSchema(loginSchema)

export type LoginResponse = z.infer<typeof loginResponseSchema>

export const meSchema = z.object({
  id: z.number(),
  email: z.string(),
  login: z.string(),
})

export const meResponseSchema = baseResponseSchema(meSchema)

export type MeResponse = z.infer<typeof meResponseSchema>

export const captchaSchema = z.object({
  url: z.string(),
})

export type CaptchaResponse = z.infer<typeof captchaSchema>
