import { baseResponseSchema } from '@/common/schemas'
import { z } from 'zod'

export const loginInputsSchema = z.object({
  email: z.email({ error: 'Incorrect email address' }),
  password: z
    .string()
    .min(1, { error: 'Password is required' })
    .min(3, { error: 'Password must be at least 3 characters long' }),
  rememberMe: z.boolean().optional(),
  captcha: z.string().optional(),
})

export const loginSchema = z.object({
  userId: z.number(),
  token: z.string(),
})

export const loginResponseSchema = baseResponseSchema(loginSchema)

export const meSchema = z.object({
  id: z.string(),
  email: z.string(),
  login: z.string(),
})

export const meResponseSchema = baseResponseSchema(meSchema)
export const captchaSchema = z.object({
  url: z.string(),
})
